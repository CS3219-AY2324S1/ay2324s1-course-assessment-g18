import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionSchema } from './questions/question.schema';
import { Question } from './questions/question.schema';
import {ConfigModule} from '@nestjs/config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { QuestionModule } from './questions/question.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // TypeOrmModule.forFeature([User]), TypeOrmModule.forRoot({
    //     type: 'postgres',
    //     host: process.env.GOOGLE_HOST,
    //     // port: 5432,
    //     entities: [User],
    //     username: process.env.DB_USERNAME,
    //     password: process.env.DB_PASSWORD,
    //     database: process.env.DB_NAME,
    //     autoLoadEntities: true,
    //     synchronize: false,
    //   }),
    // UserModule,
    MongooseModule.forRoot(
        'mongodb+srv://CS3219G18:XGrPYdDUo4ivoMIU@peerprep.e87nhmv.mongodb.net/questions',
    ),
    MongooseModule.forFeature([{name: Question.name, schema: QuestionSchema}]),
    QuestionModule,
    // AuthModule,
    // TypeOrmModule.forFeature([Question]),

  ],
  controllers: [AppController],
providers: [AppService],
})
export class AppModule {}
