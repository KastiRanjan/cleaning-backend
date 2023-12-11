import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../typeorm-base-entity';
import { Permission } from './permission.entity';
import { User } from '../user';

@Entity({
  name: 'role',
})
export class Role extends BaseEntity {
  @Column({
    length: 200,
    unique: true,
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  isActive: boolean;

  @Column({
    nullable: false,
  })
  isEditable: boolean;

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable()
  permission: Permission[];

  @ManyToMany(() => User, (user) => user.roles, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  users: Role[];
}
