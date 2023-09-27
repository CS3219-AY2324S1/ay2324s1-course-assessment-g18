import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UserModule } from './users/user.module';
import {ConfigModule} from '@nestjs/config';

@Module({
  imports: [ 
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([User]), TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.GOOGLE_HOST,
    // port: 5432,
    entities: [User],
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: true,
  }),
    UserModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
