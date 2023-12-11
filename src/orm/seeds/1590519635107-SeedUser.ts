import { MigrationInterface, QueryRunner } from 'typeorm';

import { generatePassword } from '../../helper/hashing-helper';
import db from '../config/ormconfig';
import { Role } from '../entities/roleAndPermission';
import { UserType } from '../entities/user';
import { User } from '../entities/user/user.entities';
import { Gender, Race, UserProfile } from '../entities/user/user-profile.entities';

export class SeedUser1590519635107 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const userRepository = db.getRepository(User);
    const userTypeRepository = db.getRepository(UserType);
    const roleRepository = db.getRepository(Role);
    const useProfileRepository = db.getRepository(UserProfile);

    const user = new User();
    user.username = 'Admin';
    user.email = 'ranjan.kasti@cleaning.com';
    user.password = await generatePassword('admin@123456'); //'admin@12345';
    user.phoneNumber = '9874563210';

    const userType = await userTypeRepository.findOne({ where: { systemName: 'manager' } });
    user.userType = userType;

    user.isActive = true;

    const role = await roleRepository.findOne({
      where: {
        name: 'admin',
      },
    });

    user.roles = [role];
    const savedUser = await userRepository.save(user);

    const userProfile = new UserProfile();

    userProfile.address = '';
    userProfile.pp = '';
    userProfile.citizenship = '';
    userProfile.passport = '';
    userProfile.gender = Gender.MALE;
    userProfile.race = Race.ASIAN;
    userProfile.memberType = '';
    userProfile.user = savedUser;

    await useProfileRepository.save(userProfile);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    console.log('Not implemented');
  }
}
