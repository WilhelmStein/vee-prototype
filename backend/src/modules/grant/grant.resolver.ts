import { Args, ID, Query, Resolver } from "@nestjs/graphql";
import { GrantService } from "./grant.service";
import { Grant } from "./schema/grant.entity";
import { GrantUserInteraction } from "./schema/grant-user-interaction.entity";

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
}
