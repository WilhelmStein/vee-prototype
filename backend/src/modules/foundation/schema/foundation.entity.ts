import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Grant } from '@modules/grant/schema/grant.entity';

@Entity()
export class Foundation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    photoUrl: string;

    @OneToMany(() => Grant, grant => grant.foundation)
    postedGrants: Grant[];
}
