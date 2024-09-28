import { ApplicationStatus } from "@common/graphql-typings.generated";
import { Foundation } from "@modules/foundation/schema/foundation.entity";
import { GrantUserInteraction } from "@modules/grant/schema/grant-user-interaction.entity";
import { Grant } from "@modules/grant/schema/grant.entity";
import { User } from "@modules/user/schema/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getFutureDate } from "@utils/dates";
import { Repository } from "typeorm";


@Injectable()
export class SeedService {

    constructor(
        @InjectRepository(Grant)
        private grantRepo: Repository<Grant>,

        @InjectRepository(Foundation)
        private foundationRepo: Repository<Foundation>,

        @InjectRepository(User)
        private userRepo: Repository<User>,

        @InjectRepository(GrantUserInteraction)
        private grantUserInteractionRepo: Repository<GrantUserInteraction>
    ) { }

    async seed(): Promise<void> {

        // Wipe the DB
        await this.cleanDB()

        // Users
        const usersData: Partial<User>[] = [
            {
                email: "ioannis.cheilaris@gmail.com"
            },
            {
                email: "brett.terespolsky@vee.com",
            }
        ];

        const savedUsers: User[] = await this.userRepo.save(
            usersData.map((user: Partial<User>) => (
                this.userRepo.create(user)
            ))
        );

        // Foundations
        const foundationsData: Partial<Foundation>[] = [
            {
                name: "Cremonian Foundation",
            },
            {
                name: "Athenian Shipmakers Association"
            },
            {
                name: "France Telecoms"
            },
            {
                name: "London Royal Conservatory"
            }
        ]

        const savedFoundations: Foundation[] = await this.foundationRepo.save(
            foundationsData.map((foundation: Partial<Foundation>) => (
                this.foundationRepo.create(foundation)
            ))
        )

        // Grants
        const grantsData: Partial<Grant>[] = [
            {
                name: "Cremonian Grant",
                location: "Cremonia",
                areasOfFunding: ["Heavy Industry", "Mining", "Metalworks", "Steel Refining", "Metalworking", "Railworks"],
                amountDollars: 25000,
                applicationStartDate: new Date(),
                applicationEndDate: getFutureDate(10),
                foundation: savedFoundations[0],
            },
            {
                name: "Ship Automation Grant",
                location: "Attiki, Greece",
                areasOfFunding: ["Shipworks", "Transportation", "AI", "Automation"],
                amountDollars: 70000,
                applicationStartDate: new Date(),
                applicationEndDate: getFutureDate(25),
                foundation: savedFoundations[1],
            },
            {
                name: "Automated Whale Oil Extraction Grant",
                location: "Attiki, Greece",
                areasOfFunding: ["Shipworks", "Extraction", "Whales", "AI", "Automation"],
                amountDollars: 25000,
                applicationStartDate: new Date(),
                applicationEndDate: getFutureDate(15),
                foundation: savedFoundations[1],
            },
            {
                name: "Mother Base Construction",
                location: "Zanzibar",
                areasOfFunding: ["Shipworks", "Diamond Dogs", "Construction"],
                amountDollars: 250000,
                applicationStartDate: new Date(),
                applicationEndDate: getFutureDate(125),
                foundation: savedFoundations[1],
            },
            {
                name: "High Performance Telecoms Construction",
                location: "Attiki, Greece",
                areasOfFunding: ["Telecoms", "Construction"],
                amountDollars: 122000,
                applicationStartDate: new Date(),
                applicationEndDate: getFutureDate(25),
                foundation: savedFoundations[2],
            },
            {
                name: "High Performance Telecoms Construction",
                location: "Paris",
                areasOfFunding: ["Telecoms", "Construction"],
                amountDollars: 1222000,
                applicationStartDate: new Date(),
                applicationEndDate: getFutureDate(25),
                foundation: savedFoundations[2],
            },
            {
                name: "High Performance Telecoms Construction",
                location: "Rome",
                areasOfFunding: ["Telecoms", "Construction"],
                amountDollars: 122000,
                applicationStartDate: new Date(),
                applicationEndDate: getFutureDate(25),
                foundation: savedFoundations[2],
            },
            {
                name: "Retelling of Henry IV",
                location: "London",
                areasOfFunding: ["Arts", "Theater"],
                amountDollars: 50000,
                applicationStartDate: new Date(),
                applicationEndDate: getFutureDate(25),
                foundation: savedFoundations[3],
            },
            {
                name: "Retelling of Richard II",
                location: "London",
                areasOfFunding: ["Arts", "Theater"],
                amountDollars: 50000,
                applicationStartDate: new Date(),
                applicationEndDate: getFutureDate(25),
                foundation: savedFoundations[3],
            },
        ];

        const savedGrants: Grant[] = await this.grantRepo.save(
            grantsData.map((grant: Partial<Grant>) => (
                this.grantRepo.create(grant)
            ))
        )

        // grant-user-interactions
        const grantUserInteractionsData: Partial<GrantUserInteraction>[] = [
            {
                user: savedUsers[0],
                grant: savedGrants[3],
                status: ApplicationStatus.PENDING,
                matchDate: new Date()
            },
            {
                user: savedUsers[0],
                grant: savedGrants[4],
                status: ApplicationStatus.ACCEPTED,
                matchDate: new Date()
            },
            {
                user: savedUsers[0],
                grant: savedGrants[5],
                status: ApplicationStatus.REJECTED,
                matchDate: new Date()
            },
        ];

        await this.grantUserInteractionRepo.save(
            grantUserInteractionsData.map(
                (grantUserInteraction: Partial<GrantUserInteraction>) => (
                    this.grantUserInteractionRepo.create(grantUserInteraction)
                )
            )
        );
    }

    private async cleanDB(): Promise<void> {
        await this.grantUserInteractionRepo.query('TRUNCATE TABLE "grant_user_interaction" RESTART IDENTITY CASCADE;');
        await this.grantRepo.query('TRUNCATE TABLE "grant" RESTART IDENTITY CASCADE;');
        await this.foundationRepo.query('TRUNCATE TABLE "foundation" RESTART IDENTITY CASCADE;');
        await this.userRepo.query('TRUNCATE TABLE "user" RESTART IDENTITY CASCADE;');
    }
}

