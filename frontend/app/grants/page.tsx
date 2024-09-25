"use client";

import { Table, TableBody, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import MatchCard from "./matchCard";

type Match = {
    organizationName: string;
    grantName: string;
    location: string;
    fundingAreas: string[];
    grantAmountDollars: number;
    deadlineDate: Date;
}

type Grant = {

}

const Page = () => {

    const matches: Match[] = [
        {
            organizationName: 'Cremonium Inc',
            grantName: "Cremonian Grant",
            location: "Cremonia",
            fundingAreas: ["Heavy Industry", "Mining", "Metalworks", "Steel Refining", "Metalworking", "Anti-Union"],
            grantAmountDollars: 25000,
            deadlineDate: new Date()
        }];

    const appliedGrants: Grant[] = [];

    return (
        <div className="flex flex-col">
            {/* New matches segment */}

            <div className="flex flex-col mt-10">

                <h1 className="text-xl font-semibold">New Matches</h1>

                <div className="flex flex-row justify-evenly">
                    {
                        matches.map(
                            ({ organizationName, grantName, location, fundingAreas, grantAmountDollars, deadlineDate }: Match, idx: number) => (
                                <MatchCard
                                    key={idx}
                                    organizationName={organizationName}
                                    grantName={grantName}
                                    location={location}
                                    fundingAreas={fundingAreas}
                                    grantAmountDollars={grantAmountDollars}
                                    deadlineDate={deadlineDate}
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
