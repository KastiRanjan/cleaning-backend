import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../typeorm-base-entity';

@Entity('userType')
export class UserType extends BaseEntity {
  @Column({ length: 200 })
  systemName: string;

  @Column({ length: 200 })
  displayName: string;
}
