import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
imports:[TypeOrmModule.forFeature([User]), TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.GOOGLE_HOST,
    // port: 5432,
    entities: [User],
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: false,
    }),
    UserModule,],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})

export class UserModule{};