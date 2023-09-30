import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthMongoRepository } from "./auth.repository";
import { Auth, AuthSchema } from "./auth.schema";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { RefreshTokenStrategy } from "./strategies/refreshToken.strategy";
import { AccessTokenStrategy } from "./strategies/accessToken.strategy";


@Module({
    imports: [MongooseModule.forRoot(
        'mongodb+srv://CS3219G18:XGrPYdDUo4ivoMIU@peerprep.e87nhmv.mongodb.net/credentials',
    ),
    MongooseModule.forFeature([{name: Auth.name, schema: AuthSchema}]),
    JwtModule.register({}),
    ClientsModule.register([{
    name: 'USER_SERVICE',
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'users_queue',
      queueOptions: {
        durable: false
      }
    }
  }])],
    controllers: [AuthController],
    providers: [AuthService, AuthMongoRepository, RefreshTokenStrategy, AccessTokenStrategy],
})

export class AuthModule{};