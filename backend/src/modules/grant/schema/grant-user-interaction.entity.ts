import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '@modules/user/schema/user.entity';
import { Grant } from '@modules/grant/schema/grant.entity';
import { ApplicationStatus, LikedStatus } from '@common/graphql-typings.generated';

@Entity()
export class GrantUserInteraction {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.grantInteractions)
    user: User;

    @ManyToOne(() => Grant, grant => grant.userInteractions)
    grant: Grant;

    @Column({ type: 'enum', enum: LikedStatus, nullable: true })
    likedStatus: LikedStatus;

    @Column({ nullable: true })
    feedbackText: string;

    @Column({ type: 'enum', enum: ApplicationStatus, nullable: true })
    status: ApplicationStatus;

    @Column({ type: 'timestamp' })
    matchDate: Date;
}
