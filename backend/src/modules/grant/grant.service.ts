import {
  ApplicationStatus,
  GrantInteractionType,
  LikedStatus,
} from '@common/graphql-typings.generated';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GrantUserInteraction } from './schema/grant-user-interaction.entity';
import { Grant } from './schema/grant.entity';

/**
 * Service responsible for anything grant related
 */
@Injectable()
export class GrantService {
  constructor(
    @InjectRepository(Grant)
    private grantRepo: Repository<Grant>,

    @InjectRepository(GrantUserInteraction)
    private grantUserInteractionRepo: Repository<GrantUserInteraction>,
  ) {}

  /**
   * Given a `userId`, it returns all the grants that would match with a user
   * @param userId The id of the user
   */
  async getMatchingGrantsOfUser(userId: string): Promise<Grant[]> {
    /**
     * Suppose that we had magic algorithm stuff here, but for our purposes we will be receiving
     * the first 4 grants available in the postgresDB that the user hasn't marked
     */

    const matchingGrants: Grant[] = await this.grantRepo
      .createQueryBuilder('grant')
      .leftJoinAndSelect('grant.foundation', 'foundation')
      .leftJoin(
        GrantUserInteraction,
        'interaction',
        `interaction.grantId = grant.id AND interaction.userId = ${userId}`,
      )
      .where('interaction.id IS NULL')
      .orderBy('RANDOM()')
      .limit(4)
      .getMany();

    return matchingGrants;
  }

  /**
   * Given a `userId`, return all the grantUserInteractions of that user
   * @param userId The id of the user
   */
  async getAllGrantUserInteractionsOfUser(userId: string): Promise<GrantUserInteraction[]> {
    const interactions: GrantUserInteraction[] = await this.grantUserInteractionRepo.find({
      where: { user: { id: userId } },
      order: { matchDate: 'DESC' },
      relations: ['grant', 'grant.foundation'],
    });

    return interactions;
  }

  /**
   * Given a grant and a user, generate the appropriate entries in the DB relating to their interaction
   *
   * @param grantId The id of the target grant
   * @param userId The id of the user initiating the interaction
   * @param interactionType The type of the interaction
   * @param feedbackText Optional feedback text that the user might have provided
   */
  async interactWithGrant(
    grantId: string,
    userId: string,
    interactionType: GrantInteractionType,
    feedbackText?: string,
  ): Promise<GrantUserInteraction> {
    // Check if interaction already exists
    let interaction = await this.grantUserInteractionRepo.findOne({
      where: {
        grant: { id: grantId },
        user: { id: userId },
      },
    });

    // If not, create one
    if (!interaction) {
      interaction = this.grantUserInteractionRepo.create({
        matchDate: new Date(),
        grant: { id: grantId },
        user: { id: userId },
      });
    }

    // Populate interaction statuses according to `interactionType`
    if (interactionType === GrantInteractionType.APPLY) {
      interaction.status = ApplicationStatus.PENDING;
    } else if (interactionType === GrantInteractionType.THUMBS_DOWN) {
      if (interaction.status) {
        throw new BadRequestException('User cannot dislike a grant that they have applied to');
      }

      interaction.likedStatus = LikedStatus.DISLIKED;
    } else if (interactionType === GrantInteractionType.THUMBS_UP) {
      interaction.likedStatus = LikedStatus.LIKED;
    } else {
      throw new BadRequestException(`Unknown interactionType: ${interactionType} detected`);
    }

    // Save feedbackText
    if (feedbackText) {
      interaction.feedbackText = feedbackText;
    }

    // Save the record
    return this.grantUserInteractionRepo.save(interaction);
  }
}
