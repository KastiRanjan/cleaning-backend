import { MigrationInterface, QueryRunner } from 'typeorm';

import db from '../config/ormconfig';
import { Permission } from '../entities/roleAndPermission/permission.entity';
import { Role } from '../entities/roleAndPermission';

export class SeedPermissionsToSuperAdmin1590519635113 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const roleRepository = db.getRepository(Role);
    const permissionRepository = db.getRepository(Permission);

    const superadminRole = await roleRepository.findOne({ where: { name: 'admin' } });
    const permissions = await permissionRepository.find();

    if (superadminRole) {
      // Assign all permissions to the superadmin role
      superadminRole.permission = permissions;

      // Save the updated superadmin role
      await roleRepository.save(superadminRole);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    console.log('Not implemented');
  }
}
