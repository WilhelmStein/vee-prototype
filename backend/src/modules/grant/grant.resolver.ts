import { GrantInteractionType } from '@common/graphql-typings.generated';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GrantService } from './grant.service';
import { GrantUserInteraction } from './schema/grant-user-interaction.entity';
import { Grant } from './schema/grant.entity';

@Resolver('Grant')
export class GrantResolver {
  constructor(private grantService: GrantService) {}

  @Query(() => [Grant])
  matchingGrantsOfUser(@Args('userId', { type: () => ID }) userId: string) {
    return this.grantService.getMatchingGrantsOfUser(userId);
  }

  @Query(() => [GrantUserInteraction])
  allGrantUserInteractionsOfUser(@Args('userId', { type: () => ID }) userId: string) {
    return this.grantService.getAllGrantUserInteractionsOfUser(userId);
  }

  @Mutation(() => GrantUserInteraction)
  async interactWithGrant(
    @Args('grantId', { type: () => ID }) grantId: string,
    @Args('userId', { type: () => ID }) userId: string,
    @Args('interactionType') interactionType: GrantInteractionType,
    @Args('feedbackText') feedbackText?: string,
  ): Promise<GrantUserInteraction> {
    return this.grantService.interactWithGrant(grantId, userId, interactionType, feedbackText);
  }
}
