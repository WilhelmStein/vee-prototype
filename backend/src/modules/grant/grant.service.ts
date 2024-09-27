import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Grant } from './schema/grant.entity';
import { Repository } from 'typeorm';
import { GrantUserInteraction } from './schema/grant-user-interaction.entity';

/**
 * Service responsible for anything grant related
 */
@Injectable()
export class GrantService {
    constructor(
        @InjectRepository(Grant)
        private grantRepo: Repository<Grant>,

        @InjectRepository(GrantUserInteraction)
        private grantUserInteractionRepo: Repository<GrantUserInteraction>
    ) { }

    /**
     * Given a `userId`, it returns all the grants that would match with a user
     */
    async getMatchingGrantsOfUser(userId: number): Promise<Grant[]> {
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
                `interaction.grantId = grant.id AND interaction.userId = ${userId}`
            ).where('interaction.id IS NULL')
            .orderBy('RANDOM()')
            .limit(4)
            .getMany();

        return matchingGrants;
    }

    /**
     * Given a `userId`, return all the grants that this user has interacted with
     */
    async getAllGrantsOfUser(userId: number): Promise<Grant[]> {
        const interactions: GrantUserInteraction[] = await this.grantUserInteractionRepo.find({
            where: { user: { id: userId } },
            relations: ['grant']
        })

        return interactions.map((interaction) => interaction.grant);
    }
}
