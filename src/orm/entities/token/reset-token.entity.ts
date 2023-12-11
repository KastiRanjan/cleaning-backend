import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '../../typeorm-base-entity';
import { User } from '../user/user.entities';

@Entity({
  name: 'resetToken',
})
export class ResetToken extends BaseEntity {
  @Column({
    nullable: false,
  })
  token: string;

  @Column({
    nullable: false,
  })
  type: string;

  @Column({
    nullable: false,
  })
  expiresAt: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;
}
