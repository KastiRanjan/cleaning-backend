import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../typeorm-base-entity';

@Entity('mail')
export class Mail extends BaseEntity {
  @Column({
    length: 200,
  })
  logo: string;

  @Column({
    length: 200,
  })
  mailInfo: string;

  @Column({
    length: 200,
  })
  address: string;

  @Column({
    length: 500,
    nullable: true,
  })
  facebook: string;

  @Column({
    length: 500,
    nullable: true,
  })
  instagram: string;

  @Column({
    length: 500,
    nullable: true,
  })
  twitter: string;

  @Column({
    length: 500,
    nullable: true,
  })
  linkedIn: string;
  @Column({
    length: 500,
    nullable: true,
  })
  mapUrl: string;
}
