import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Auth, AuthDocument } from "./auth.schema";
import { AuthDto, CreateUserDto, UpdatePasswordDto } from "./dto/auth.dto";

export interface AuthRepository {
    getCredentialsByEmail(email:string);
    addCredentials(authDto: AuthDto);
}


@Injectable()
export class AuthMongoRepository implements AuthRepository {

    constructor(@InjectModel(Auth.name) private authModel: Model<AuthDocument>){}
    
    async getCredentialsByEmail(email: String) {
        return await this.authModel.findOne({email});
    }

    async getCredentialsByEmailOrAdd(authDto: AuthDto) {
        const {email, password, providerId} = authDto;
        const foundCredentials = await this.authModel.findOne({email});
        if (foundCredentials) {
            return foundCredentials;
        }
        return await this.authModel.create(authDto);
    }

    async getAllCredentials() {
        return await this.authModel.find().exec();
    }


    async addCredentials(authDto: AuthDto) {
        return await this.authModel.create(authDto);
    }

    async getCredentialsById(userId: string) {
        return await this.authModel.findById(userId);
    }

    async deleteUser(email: string) {
        await this.authModel.findOneAndDelete({email});
    }

    async updatePassword(userId: string, authDto: AuthDto) {
        await this.authModel.findByIdAndUpdate(userId, authDto);
    }
}