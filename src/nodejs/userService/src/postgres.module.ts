// postgres.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from '../typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig)],
})
export class PostgresModule {}
