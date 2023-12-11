import { Column, CreateDateColumn, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: string;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    nullable: true,
    default: null,
  })
  @Index()
  createdAt?: Date;

  @Column({
    type: 'uuid',
    nullable: true,
    default: null,
  })
  createdBy?: string;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    nullable: true,
    default: null,
  })
  @Index()
  modifiedAt?: Date;

  @Column({
    type: 'uuid',
    nullable: true,
    default: null,
  })
  modifiedBy?: string;
}
