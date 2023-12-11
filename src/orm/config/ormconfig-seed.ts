import dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Permission, Role } from '../entities/roleAndPermission';
import { User } from '../entities/user';

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
  logging: false,
  entities: [User, Role, Permission],
  // migrationsRun: true,
  migrations: ['src/orm/seeds/**/*.ts'],
};
const db = new DataSource(PostgresConnection);

export default db;
