
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum GrantInteractionType {
    THUMBS_UP = "THUMBS_UP",
    THUMBS_DOWN = "THUMBS_DOWN",
    APPLY = "APPLY"
}

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
    allGrantUserInteractionsOfUser(userId: string): GrantUserInteraction[] | Promise<GrantUserInteraction[]>;
}

export interface IMutation {
    interactWithGrant(grantId: string, userId: string, interactionType: GrantInteractionType, feedbackText?: Nullable<string>): GrantUserInteraction | Promise<GrantUserInteraction>;
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
    status?: Nullable<ApplicationStatus>;
    matchDate: Date;
}

export interface User {
    id: string;
    email: string;
    grantInteractions: GrantUserInteraction[];
}

type Nullable<T> = T | null;
