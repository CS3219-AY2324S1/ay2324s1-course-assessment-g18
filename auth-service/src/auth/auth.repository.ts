import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Auth, AuthDocument } from "./auth.schema";
import { AuthDto, CreateUserDto } from "./dto/auth.dto";

export interface AuthRepository {
    getCredentialsByEmail(email:string);
    addCredentials(authDto: AuthDto);
}


@Injectable()
export class AuthMongoRepository implements AuthRepository {

    constructor(@InjectModel(Auth.name) private authModel: Model<AuthDocument>){}
    
    async getCredentialsByEmail(email: string) {
        return await this.authModel.findOne({email});
    }

    async addCredentials(authDto: AuthDto) {
        return await this.authModel.create(authDto);
    }

    async getCredentialsById(userId: string) {
        return await this.authModel.findById(userId);
    }
}