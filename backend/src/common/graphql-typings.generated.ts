
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum ApplicationStatus {
    PENDING = "PENDING",
    REJECTED = "REJECTED",
    ACCEPTED = "ACCEPTED"
}

export enum LikedStatus {
    LIKED = "LIKED",
    DISLIKED = "DISLIKED"
}

export interface Foundation {
    id: string;
    name: string;
    photoUrl?: Nullable<string>;
    postedGrants: Grant[];
}

export interface IQuery {
    matchingGrantsOfUser(userId: string): Grant[] | Promise<Grant[]>;
    allGrantsOfUser(userId: string): Grant[] | Promise<Grant[]>;
}

export interface IMutation {
    userApplyForGrant(userId: string, grantId: string): GrantUserInteraction | Promise<GrantUserInteraction>;
    userLikeGrant(userId: string, grantId: string): GrantUserInteraction | Promise<GrantUserInteraction>;
    userDisikeGrant(userId: string, grantId: string): GrantUserInteraction | Promise<GrantUserInteraction>;
}

export interface Grant {
    id: string;
    name: string;
    applicationStartDate: Date;
    applicationEndDate: Date;
    location: string;
    foundation: Foundation;
    amountDollars: number;
    areasOfFunding: string[];
}

export interface GrantUserInteraction {
    id: string;
    user: User;
    grant: Grant;
    likedStatus?: Nullable<LikedStatus>;
    feedbackText?: Nullable<string>;
    status: ApplicationStatus;
}

export interface User {
    id: string;
    email: string;
    grantInteractions: GrantUserInteraction[];
}

type Nullable<T> = T | null;
