import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthMongoRepository } from "./auth.repository";
import { Auth, AuthSchema } from "./auth.schema";
import { JwtModule, JwtService } from "@nestjs/jwt";


@Module({
    imports: [MongooseModule.forRoot(
        'mongodb+srv://CS3219G18:XGrPYdDUo4ivoMIU@peerprep.e87nhmv.mongodb.net/credentials',
    ),
    MongooseModule.forFeature([{name: Auth.name, schema: AuthSchema}]),
JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, AuthMongoRepository],
})

export class AuthModule{};