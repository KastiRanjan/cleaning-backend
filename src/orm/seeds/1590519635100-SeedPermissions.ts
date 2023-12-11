import { MigrationInterface, QueryRunner } from 'typeorm';

import db from '../config/ormconfig';
import { Permission } from '../entities/roleAndPermission/permission.entity';

export class SeedPermissions1590519635100 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const permissionRepository = db.getRepository(Permission);

    const permissions = [
      //user
      { category: 'User Management', systemName: 'create_user', displayName: 'Create user', displayOrder: 1 },
      { category: 'User Management', systemName: 'view_user', displayName: 'View user', displayOrder: 2 },
      { category: 'User Management', systemName: 'update_user', displayName: 'Update user', displayOrder: 3 },
      { category: 'User Management', systemName: 'delete_user', displayName: 'Delete user', displayOrder: 4 },
      { category: 'User Management', systemName: 'view_user_list', displayName: 'View user list', displayOrder: 5 },
      {
        category: 'User Management',
        systemName: 'view_user_status',
        displayName: 'View user status',
        displayOrder: 11,
      },
      //role
      { category: 'Role Management', systemName: 'create_role', displayName: 'Create Role', displayOrder: 13 },
      { category: 'Role Management', systemName: 'view_role_list', displayName: 'View role list', displayOrder: 14 },
      {
        category: 'Role Management',
        systemName: 'view_permission_list',
        displayName: 'View permission list',
        displayOrder: 15,
      },
      { category: 'Role Management', systemName: 'update_role', displayName: 'Update Role', displayOrder: 16 },
      {
        category: 'Role Management',
        systemName: 'update_role_status',
        displayName: 'Update Role Status',
        displayOrder: 17,
      },
      { category: 'Role Management', systemName: 'delete_role', displayName: 'Delete Role', displayOrder: 18 },
      { category: 'Role Management', systemName: 'view_role', displayName: 'View Role', displayOrder: 61 },
    ];

    for (const permissionData of permissions) {
      // Check if a permission with the same systemName already exists
      const existingPermission = await permissionRepository.findOne({
        where: { systemName: permissionData.systemName },
      });

      if (!existingPermission) {
        const permission = new Permission();
        permission.category = permissionData.category;
        permission.systemName = permissionData.systemName;
        permission.displayName = permissionData.displayName;
        permission.displayOrder = permissionData.displayOrder;
        await permissionRepository.save(permission);
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    console.log('Not implemented');
  }
}
