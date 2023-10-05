import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt';

export type AuthDocument = Auth & Document;


@Schema()
export class Auth {
    @Prop()
    email: string;

    @Prop()
    password: string;

    validatePassword: Function;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);

AuthSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
}

