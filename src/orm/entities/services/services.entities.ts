import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../typeorm-base-entity';
import { ServiceCategory } from '../servicesCategory/services-category.entities';

interface image {
  imageIndex: string;
  img: string;
}

@Entity({
  name: 'services',
})
export class Services extends BaseEntity {
  @Column({
    nullable: false,
  })
  name: string;

  @Column({})
  type: string;

  @Column('jsonb', { default: [] })
  material: [];

  @Column('jsonb', { default: [] })
  images: image[];

  @Column()
  thumbnail: string;

  @ManyToOne(() => ServiceCategory)
  category: ServiceCategory;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'float' })
  discountPrice: number;

  @Column({ type: 'float' })
  additionalPrice: number;
}
