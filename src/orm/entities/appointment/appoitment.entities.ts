import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../typeorm-base-entity';
import { Services } from '../services';
import { User } from '../user';
import { Assignee } from '../assignee';

@Entity({
  name: 'appointment',
})
export class Appointment extends BaseEntity {
  @Column({
    nullable: false,
  })
  noh: string;

  @Column({
    nullable: false,
  })
  pr: string;

  @Column({
    nullable: false,
  })
  materialRequired: boolean;

  @Column({
    nullable: false,
  })
  frequency: boolean;

  @Column({
    nullable: false,
  })
  date: Date;

  @Column({
    nullable: false,
  })
  time: Date;

  @Column({
    nullable: false,
  })
  location: string;

  @Column({
    nullable: false,
  })
  source: string;

  @OneToOne(() => Services)
  @JoinColumn()
  services: Services;

  @ManyToOne(() => User, (user) => user.appointment)
  customer: User;

  @OneToMany(() => Assignee, (assignee) => assignee.appointment)
  assignee: Assignee[];
}
