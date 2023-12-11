import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../typeorm-base-entity';
import { Role } from './role.entity';

@Entity({
  name: 'permission',
})
export class Permission extends BaseEntity {
  @Column({
    type: Number,
    unique: true,
    nullable: false,
  })
  displayOrder: number;

  @Column()
  category: string;

  @Column()
  systemName: string;

  @Column()
  displayName: string;

  @ManyToMany(() => Role, (role) => role.permission)
  roles: Role[];
}
