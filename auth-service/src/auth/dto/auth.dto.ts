import {IsString} from 'class-validator'


export class AuthDto {
    @IsString()
    email: string;

    @IsString()
    password: string;
}

export class CreateUserDto {
    @IsString()
    username: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    role: string;

    @IsString()
    refreshToken: string;
}