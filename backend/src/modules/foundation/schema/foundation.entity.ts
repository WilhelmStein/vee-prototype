import { Foundation as FoundationBase } from '@common/graphql-typings.generated';
import { Grant } from '@modules/grant/schema/grant.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Foundation implements FoundationBase {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  photoUrl: string;

  @OneToMany(() => Grant, (grant) => grant.foundation)
  postedGrants: Grant[];
}
