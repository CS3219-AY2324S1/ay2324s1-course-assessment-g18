// typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config(); // Load environment variables from .env file

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
//   host: process.env.GOOGLE_HOST,
host: 'localhost',
  port: 5432,
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
     database: "user",
//   entities: ['dist/**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
  entities: ['dist/users/*.entity{.ts,.js}'],
  synchronize: true,
};

export default typeOrmConfig;
