import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../typeorm-base-entity';

@Entity({
  name: 'subscription',
})
export class Subscription extends BaseEntity {
  @Column({
    nullable: false,
  })
  systemName: string;

  @Column({
    nullable: false,
  })
  displayName: string;
}
