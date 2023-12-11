import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../typeorm-base-entity';

@Entity({
  name: 'servicesCategory',
})
export class ServiceCategory extends BaseEntity {
  @Column({
    nullable: false,
  })
  name: string;
}
