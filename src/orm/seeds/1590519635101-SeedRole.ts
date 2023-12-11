import { MigrationInterface, QueryRunner } from 'typeorm';

import db from '../config/ormconfig';
import { Role } from '../entities/roleAndPermission/role.entity';

export class SeedRole1590519635101 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let role = new Role();
    const roleRepository = db.getRepository(Role);

    role = new Role();
    role.name = 'admin';
    role.isActive = true;
    role.isEditable = false;
    await roleRepository.save(role);

    role = new Role();
    role.name = 'staff';
    role.isActive = false;
    role.isEditable = false;
    await roleRepository.save(role);

    role = new Role();
    role.name = 'customer';
    role.isActive = false;
    role.isEditable = false;
    await roleRepository.save(role);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    console.log('Not implemented');
  }
}
