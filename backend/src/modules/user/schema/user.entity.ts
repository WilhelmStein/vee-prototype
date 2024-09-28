import { User as UserBase } from '@common/graphql-typings.generated';
import { GrantUserInteraction } from '@modules/grant/schema/grant-user-interaction.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User implements UserBase {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => GrantUserInteraction, (interaction) => interaction.user)
  grantInteractions: GrantUserInteraction[];
}
