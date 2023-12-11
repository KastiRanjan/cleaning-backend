import bcrypt from 'bcryptjs';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../typeorm-base-entity';
import { Role } from '../roleAndPermission/role.entity';
import { ResetToken } from '../token/reset-token.entity';
import { UserType } from './user-type.entity';
import { Appointment } from '../appointment';
import { Assignee } from '../assignee';
import { UserProfile } from './user-profile.entities';

@Entity('user')
export class User extends BaseEntity {
  @Column({
    length: 200,
  })
  email: string;

  @Column({
    nullable: true,
  })
  password: string;

  @Column({
    length: 200,
    nullable: true,
  })
  username: string;

  @Column({
    length: 200,
    nullable: true,
  })
  phoneNumber: string;

  @Column({
    nullable: true,
  })
  isActive: boolean;

  @ManyToOne(() => UserType)
  userType: UserType;

  @OneToMany(() => ResetToken, (resetToken) => resetToken.user, {
    onDelete: 'CASCADE',
  })
  resetToken!: ResetToken[];

  @OneToMany(() => Appointment, (appointment) => appointment.customer, {
    onDelete: 'CASCADE',
  })
  appointment!: Appointment[];

  @OneToMany(() => Assignee, (assignee) => assignee.user, {
    onDelete: 'CASCADE',
  })
  assignee!: Assignee[];

  @ManyToMany(() => Role, (role) => role.users, {
    onDelete: 'CASCADE',
  })
  roles: Role[];

  @OneToOne(() => UserProfile, (profile) => profile.user) // specify inverse side as a second parameter
  @JoinColumn()
  profile: UserProfile;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfPasswordMatch(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
