import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GrantUserInteraction } from '@modules/grant/schema/grant-user-interaction.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @OneToMany(() => GrantUserInteraction, interaction => interaction.user)
    grantInteractions: GrantUserInteraction[];
}
