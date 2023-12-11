import { MigrationInterface, QueryRunner } from 'typeorm';

import { UserType } from '../entities/user';
import db from '../config/ormconfig';

export class SeedUserType1590519635105 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let userType = new UserType();
    const userTypeRepository = db.getRepository(UserType);

    userType = new UserType();
    userType.systemName = 'manager';
    userType.displayName = 'Manager';
    await userTypeRepository.save(userType);

    userType = new UserType();
    userType.systemName = 'customer';
    userType.displayName = 'Customer';
    await userTypeRepository.save(userType);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    console.log('Not implemented');
  }
}
