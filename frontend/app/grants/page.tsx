"use client";

import { Table, TableBody, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import MatchCard from "./matchCard";
import { GET_MATCHING_GRANTS_OF_USER } from "./graphql";
import { useQuery } from "@apollo/client";

type Match = {
    name: string;
    location: string;
    areasOfFunding: string[];
    grantAmountDollars: number;
    deadlineDate: Date;
    amountDollars: number,
    applicationStartDate: Date,
    applicationEndDate: Date
    foundation: { name: string }
}

type Grant = {

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

    const appliedGrants: Grant[] = [];

    return (
        <div className="flex flex-col">
            {/* New matches segment */}

            <div className="flex flex-col mt-10">

                <h1 className="text-xl font-semibold">New Matches</h1>

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
                                }: Match, idx: number) => (
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
                <h1>Applied Grants</h1>

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
                                Match date
                            </TableColumn>
                        </TableHeader>

                        <TableBody>
                            {

                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default Page;
