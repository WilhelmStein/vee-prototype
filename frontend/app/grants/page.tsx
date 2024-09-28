"use client";

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import MatchedGrantCard from "./(matchedGrantCard)/matchedGrantCard";
import { GET_ALL_GRANT_USER_INTERACTIONS_OF_USER, GET_MATCHING_GRANTS_OF_USER, INTERACT_WITH_GRANT } from "./graphql";
import { useMutation, useQuery } from "@apollo/client";
import React, { useCallback, useMemo } from "react";
import { ApplicationStatus, Grant, GrantInteractionType, GrantUserInteraction, LikedStatus } from "@lib/graphql-typings.generated";
import MatchedGrantSkeleton from "./(matchedGrantCard)/matchedGrantSkeleton";
import AllGrantInteractionsTableSkeleton from "./allGrantInteractionsTableSkeleton";

/**
 * Hardcoded for now, suppose that we have user authentication set up
 * and that we have logged in as user with id 1
 */
const LOGGED_IN_USER_ID = 1;


type ApplicationStatusTableCellProps = {
    likedStatus?: LikedStatus | null;
    applicationStatus?: ApplicationStatus | null;
}

/**
 * Utility component with custom logic that renders a `GrantUserInteraction`'s status
 */
const ApplicationStatusTableCellContents = (props: ApplicationStatusTableCellProps) => {

    const { applicationStatus, likedStatus } = props;

    const { backgroundColor, text, textColor } = useMemo(() => {
        if (applicationStatus === null) {
            return { backgroundColor: '#e5e3e5', textColor: '#5d585e', text: 'Not Applied' }
        }

        let backgroundColor, textColor;

        if (applicationStatus === ApplicationStatus.ACCEPTED) {
            backgroundColor = "#5af2bf"
            textColor = "#0b8b5f"
        } else if (applicationStatus === ApplicationStatus.PENDING) {
            backgroundColor = "#90b2f6";
            textColor = "#0f46b6"
        } else if (applicationStatus === ApplicationStatus.REJECTED) {
            backgroundColor = "#fa89af"
            textColor = "#ba0944"
        }

        return { backgroundColor, textColor, text: applicationStatus }

    }, [applicationStatus, likedStatus]);

    return (
        <div className="flex justify-center w-full rounded-lg" style={{
            background: backgroundColor,
            color: textColor,
        }}>
            {text}
        </div>
    );
};


const Page = () => {

    // Querried Data
    const matchingGrantsQueryResult = useQuery(GET_MATCHING_GRANTS_OF_USER, {
        variables: {
            userId: LOGGED_IN_USER_ID
        }
    });

    const allGrantUserInteractionsOfUserQuery = useQuery(GET_ALL_GRANT_USER_INTERACTIONS_OF_USER, {
        variables: {
            userId: LOGGED_IN_USER_ID
        }
    });


    // Graphql Mutations
    const [interactWithGrant] = useMutation(INTERACT_WITH_GRANT, {
        variables: {
            userId: LOGGED_IN_USER_ID
        },
        onCompleted: () => {
            matchingGrantsQueryResult.refetch();
            allGrantUserInteractionsOfUserQuery.refetch();
        }
    })


    // Event Handlers
    const handleGrantInteraction = useCallback(
        (
            grantId: string,
            interactionType: GrantInteractionType,
            feedbackText?: string
        ) => {
            interactWithGrant({
                variables: {
                    grantId,
                    interactionType,
                    feedbackText
                }
            })
        },
        [interactWithGrant]
    );

    const handleThumbsUp = useCallback((grantId: string, feedbackText?: string) => {
        handleGrantInteraction(grantId, GrantInteractionType.THUMBS_UP, feedbackText)
    },
        [handleGrantInteraction]
    );

    const handleThumbsDown = useCallback((grantId: string, feedbackText?: string) => {
        handleGrantInteraction(grantId, GrantInteractionType.THUMBS_DOWN, feedbackText)
    },
        [handleGrantInteraction]
    );

    const handleApply = useCallback((grantId: string) => {
        handleGrantInteraction(grantId, GrantInteractionType.APPLY)
    },
        [handleGrantInteraction]
    );


    // General variables
    const filteredGrantInteractions = useMemo(() => allGrantUserInteractionsOfUserQuery.
        data?.
        allGrantUserInteractionsOfUser.
        filter((interaction: GrantUserInteraction) => interaction.likedStatus !== LikedStatus.DISLIKED),
        [allGrantUserInteractionsOfUserQuery.data]
    );


    return (
        <div className="flex flex-col">

            {/* New matches segment */}

            <div className="flex flex-col mt-10">

                <h1 className="text-xl font-semibold mb-2">New Matches</h1>

                <div className="flex flex-row justify-evenly">
                    {
                        matchingGrantsQueryResult.loading ?

                            // If loading, render a skeleton of 4 items
                            Array.from({ length: 4 }).map((_, idx) =>
                                <MatchedGrantSkeleton key={idx} />
                            )
                            :
                            matchingGrantsQueryResult
                                .data
                                ?.matchingGrantsOfUser
                                ?.map(
                                    (matchedGrant: Grant, idx: number) => (
                                        <MatchedGrantCard
                                            className="mr-2"
                                            key={idx}
                                            grant={matchedGrant}
                                            onThumbsUp={handleThumbsUp}
                                            onThumbsDown={handleThumbsDown}
                                            onApply={handleApply}
                                        />
                                    )
                                )
                    }
                </div>

            </div>

            {/* All contract opportunities segment */}

            <div className="mt-10">
                <h1 className="mb-2">All Grant Interactions</h1>

                {
                    allGrantUserInteractionsOfUserQuery.loading ?
                        <AllGrantInteractionsTableSkeleton rows={4} />
                        :
                        <Table>
                            <TableHeader>
                                <TableColumn>
                                    Foundation name
                                </TableColumn>

                                <TableColumn>
                                    Grant Name
                                </TableColumn>

                                <TableColumn>
                                    Average amount
                                </TableColumn>

                                <TableColumn>
                                    Status
                                </TableColumn>

                                <TableColumn>
                                    Deadline
                                </TableColumn>

                                <TableColumn>
                                    Match date
                                </TableColumn>
                            </TableHeader>

                            <TableBody>
                                {
                                    filteredGrantInteractions
                                        ?.map(
                                            ({
                                                grant,
                                                status,
                                                likedStatus,
                                                matchDate
                                            }: GrantUserInteraction) => (
                                                <TableRow>
                                                    <TableCell className="text-gray-400">{grant.foundation.name}</TableCell>

                                                    <TableCell className="text-gray-400">{grant.name}</TableCell>

                                                    <TableCell className="text-gray-400">${grant.amountDollars}</TableCell>

                                                    <TableCell>
                                                        <ApplicationStatusTableCellContents likedStatus={likedStatus} applicationStatus={status} />
                                                    </TableCell>

                                                    <TableCell className="text-gray-400">{new Date(grant.applicationEndDate).toISOString().split('T')[0]}</TableCell>

                                                    <TableCell className="text-gray-400">{new Date(matchDate).toISOString().split('T')[0]}</TableCell>
                                                </TableRow>
                                            )
                                        )
                                }
                            </TableBody>
                        </Table>
                }

            </div>
        </div>
    );
}

export default Page;
