import { Grant as GrantBase } from '@common/graphql-typings.generated';
import { Foundation } from '@modules/foundation/schema/foundation.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GrantUserInteraction } from './grant-user-interaction.entity';

@Entity()
export class Grant implements GrantBase {
  @PrimaryGeneratedColumn()
  id: string;

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

  @ManyToOne(() => Foundation, (foundation) => foundation.postedGrants)
  foundation: Foundation;

  @OneToMany(() => GrantUserInteraction, (interaction) => interaction.grant)
  userInteractions: GrantUserInteraction[];
}
