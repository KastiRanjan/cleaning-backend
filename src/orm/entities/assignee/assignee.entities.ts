import { Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../typeorm-base-entity';

import { Appointment } from '../appointment';
import { User } from '../user';

@Entity({
  name: 'assignee',
})
export class Assignee extends BaseEntity {
  @ManyToOne(() => Appointment, (appointment) => appointment.assignee)
  appointment: Appointment;

  @ManyToMany(() => User, (user) => user.assignee)
  @JoinTable()
  user: Assignee[];
}
