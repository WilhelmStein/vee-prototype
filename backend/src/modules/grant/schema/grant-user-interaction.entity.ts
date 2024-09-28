import {
  ApplicationStatus,
  GrantUserInteraction as GrantUserInteractionBase,
  LikedStatus,
} from '@common/graphql-typings.generated';
import { Grant } from '@modules/grant/schema/grant.entity';
import { User } from '@modules/user/schema/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GrantUserInteraction implements GrantUserInteractionBase {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.grantInteractions)
  user: User;

  @ManyToOne(() => Grant, (grant) => grant.userInteractions)
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
