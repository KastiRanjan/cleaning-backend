import dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Permission, Role } from '../entities/roleAndPermission';
import { User, UserType } from '../entities/user';
import { ResetToken } from '../entities/token';
import { Services } from '../entities/services';
import { ServiceCategory } from '../entities/servicesCategory';
import { Mail } from '../entities/mail';
import { Appointment } from '../entities/appointment';
import { Assignee } from '../entities/assignee';
import { UserProfile } from '../entities/user/user-profile.entities';

dotenv.config();

export const PostgresConnection: DataSourceOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [
    User,
    Role,
    Permission,
    UserType,
    ResetToken,
    Services,
    ServiceCategory,
    Mail,
    Appointment,
    Assignee,
    UserProfile,
  ],
  // migrationsRun: true,
  migrations: ['src/orm/seeds/**/*.ts'],
};
const db = new DataSource(PostgresConnection);

export default db;
