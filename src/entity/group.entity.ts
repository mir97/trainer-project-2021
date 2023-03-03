import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable, BaseEntity } from 'typeorm';
import { Permission } from '../type/permissions.type';
import { User } from './user.entity';

@Entity()
export class Group extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column({
    array: true,
    type: 'enum',
    enum: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
    default: [],
  })
  permissions: Array<Permission>;

  @ManyToMany(
    () => User,
    users => users.groups,
    { cascade: true },
  )
  @JoinTable({ name: 'UserGroup' })
  users!: User[];
}
