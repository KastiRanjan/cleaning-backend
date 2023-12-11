import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../typeorm-base-entity';
import { User } from './user.entities';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum Race {
  ASIAN = 'asian',
  AMERICAN = 'american',
  AFRICAN = 'african',
  AUSTERALIAN = 'austeralian',
  EUROPIAN = 'europian',
}

@Entity('userProfile')
export class UserProfile extends BaseEntity {
  @Column({
    length: 200,
  })
  address: string;

  @Column({
    nullable: true,
  })
  pp: string;

  @Column({
    nullable: true,
  })
  citizenship: string;

  @Column({
    nullable: true,
  })
  passport: string;

  @Column({
    nullable: true,
    type: 'enum',
    enum: Gender,
  })
  gender: Gender;

  @Column({
    nullable: true,
    type: 'enum',
    enum: Race,
  })
  race: Race;

  @Column({
    nullable: true,
  })
  memberType: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
