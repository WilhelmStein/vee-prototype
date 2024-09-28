import { GrantInteractionType } from '@common/graphql-typings.generated';
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GrantService } from "./grant.service";
import { GrantUserInteraction } from "./schema/grant-user-interaction.entity";
import { Grant } from "./schema/grant.entity";

@Resolver('Grant')
export class GrantResolver {
    constructor(private grantService: GrantService) { }

    @Query(() => [Grant])
    matchingGrantsOfUser(@Args('userId', { type: () => ID }) userId: number) {
        return this.grantService.getMatchingGrantsOfUser(userId);
    }

    @Query(() => [GrantUserInteraction])
    allGrantUserInteractionsOfUser(@Args('userId', { type: () => ID }) userId: number) {
        return this.grantService.getAllGrantUserInteractionsOfUser(userId);
    }

    @Mutation(() => GrantUserInteraction)
    async interactWithGrant(
        @Args('grantId', { type: () => ID }) grantId: number,
        @Args('userId', { type: () => ID }) userId: number,
        @Args('interactionType') interactionType: GrantInteractionType,
        @Args('feedbackText') feedbackText?: string,
    ): Promise<GrantUserInteraction> {
        return this.grantService.interactWithGrant(grantId, userId, interactionType, feedbackText);
    }
}
