import { Entity, PrimaryColumn, Column, BaseEntity, ManyToMany } from 'typeorm';
import { Group } from './group.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @Column()
  isDeleted: boolean;

  @ManyToMany(
    () => Group,
    group => group.users,
  )
  groups!: Group[];
}
