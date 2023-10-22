import {IsString, IsOptional} from 'class-validator'


export class AuthDto {
    @IsString()
    email: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsString()
    providerId?: string;

    // @IsString()
    // role: string;
}

export class TokenDto {
    @IsString()
    email: string;

    @IsString()
    role: string;
}


export class CreateUserDto {
    @IsString()
    username: string;

    @IsString()
    email: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsString()
    providerId?: string;

    @IsString()
    role: string;

    @IsOptional()
    @IsString()
    refreshToken?: string;
}

export class RefreshTokenDto {
    @IsString()
    refreshToken: string;
}
