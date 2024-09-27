import { Args, ID, Query, Resolver } from "@nestjs/graphql";
import { GrantService } from "./grant.service";
import { Grant } from "./schema/grant.entity";

@Resolver('Grant')
export class GrantResolver {
    constructor(private grantService: GrantService) { }

    @Query(() => [Grant])
    matchingGrantsOfUser(@Args('userId', { type: () => ID }) userId: number) {
        return this.grantService.getMatchingGrantsOfUser(userId);
    }

    @Query(() => [Grant])
    allGrantsOfUser(@Args('userId', { type: () => ID }) userId: number) {
        return this.grantService.getAllGrantsOfUser(userId);
    }
}
