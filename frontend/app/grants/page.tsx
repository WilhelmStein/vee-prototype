"use client";

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import MatchCard from "./matchCard";
import { GET_ALL_GRANT_USER_INTERACTIONS_OF_USER, GET_MATCHING_GRANTS_OF_USER } from "./graphql";
import { useQuery } from "@apollo/client";

type Grant = {
    name: string;
    location: string;
    areasOfFunding: string[];
    deadlineDate: Date;
    amountDollars: number,
    applicationStartDate: Date,
    applicationEndDate: Date
    foundation: { name: string }
}

enum LikedStatus {
    LIKED = "LIKED",
    DISLIKED = "DISLIKED"
}

enum ApplicationStatus {
    PENDING = "PENDING",
    REJECTED = "REJECTED",
    ACCEPTED = "ACCEPTED"
}

type GrantUserInteraction = {
    grant: Grant,
    likedStatus: LikedStatus,
    feedbackText: string,
    status: ApplicationStatus,
}

const Page = () => {

    const matchingGrantsQueryResult = useQuery(GET_MATCHING_GRANTS_OF_USER, {
        variables: {
            /**
             * Hardcoded for now, suppose that we have user authentication set up
             * and that we have logged in as user with id 1
             */
            userId: 1
        }
    });

    const allGrantUserInteractionsOfUserQuery = useQuery(GET_ALL_GRANT_USER_INTERACTIONS_OF_USER, {
        variables: {
            /**
             * Hardcoded for now, suppose that we have user authentication set up
             * and that we have logged in as user with id 1
             */
            userId: 1
        }
    });

    return (
        <div className="flex flex-col">

            {/* New matches segment */}

            <div className="flex flex-col mt-10">

                <h1 className="text-xl font-semibold mb-2">New Matches</h1>

                <div className="flex flex-row justify-evenly">
                    {
                        matchingGrantsQueryResult
                            .data
                            ?.matchingGrantsOfUser
                            ?.map(
                                ({
                                    name,
                                    foundation,
                                    location,
                                    areasOfFunding,
                                    amountDollars,
                                    applicationStartDate,
                                    applicationEndDate
                                }: Grant, idx: number) => (
                                    <MatchCard
                                        className="mr-2"
                                        key={idx}
                                        foundationName={foundation.name}
                                        grantName={name}
                                        location={location}
                                        areasOfFunding={areasOfFunding}
                                        amountDollars={amountDollars}
                                        applicationStartDate={applicationStartDate}
                                        applicationEndDate={applicationEndDate}
                                    />
                                )
                            )
                    }
                </div>

            </div>

            {/* All contract opportunities segment */}

            <div className="mt-10">
                <h1 className="mb-2">All Grant Interactions</h1>

                <div>
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
                                Post date
                            </TableColumn>
                        </TableHeader>

                        <TableBody>
                            {
                                allGrantUserInteractionsOfUserQuery
                                    .data
                                    ?.allGrantUserInteractionsOfUser
                                    ?.map(
                                        ({
                                            grant,
                                            status,
                                            likedStatus,
                                        }: GrantUserInteraction) => (
                                            <TableRow>
                                                <TableCell>{grant.foundation.name}</TableCell>

                                                <TableCell>{grant.name}</TableCell>

                                                <TableCell>{grant.amountDollars}</TableCell>

                                                <TableCell>{status !== undefined ? status : likedStatus}</TableCell>

                                                <TableCell>{new Date(grant.applicationEndDate).toISOString()}</TableCell>

                                                <TableCell>{new Date(grant.applicationStartDate).toISOString()}</TableCell>
                                            </TableRow>
                                        )
                                    )
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default Page;
