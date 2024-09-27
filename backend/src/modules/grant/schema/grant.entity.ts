import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Foundation } from '@modules/foundation/schema/foundation.entity';
import { GrantUserInteraction } from './grant-user-interaction.entity';

@Entity()
export class Grant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'timestamp' })
  applicationStartDate: Date;

  @Column({ type: 'timestamp' })
  applicationEndDate: Date;

  @Column()
  location: string;

  @Column('float')
  amountDollars: number;

  @Column('simple-array')
  areasOfFunding: string[];

  @ManyToOne(() => Foundation, foundation => foundation.postedGrants)
  foundation: Foundation;

  @OneToMany(() => GrantUserInteraction, interaction => interaction.grant)
  userInteractions: GrantUserInteraction[];
}
