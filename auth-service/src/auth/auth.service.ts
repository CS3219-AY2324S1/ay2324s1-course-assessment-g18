import { ForbiddenException, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthMongoRepository } from './auth.repository';
import { AuthDto, CreateUserDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom } from 'rxjs';


@Injectable()
export class AuthService {
    constructor(@Inject('USER_SERVICE') private client: ClientProxy, private authRepository: AuthMongoRepository, private jwtService: JwtService,) {}



    async signUp(createUserDto: CreateUserDto): Promise<any> {
        const userExists = await this.authRepository.getCredentialsByEmail(createUserDto.email);
        if (userExists) {
            throw new HttpException('User with the email already exists!', HttpStatus.BAD_REQUEST)
        }
        const encryptedPassword = await this.hashData(createUserDto.password);
        try {
            const newUser = {
                ...createUserDto,
            }
            newUser.password = undefined;
            const newCredentials = {
                email: createUserDto.email,
                password: encryptedPassword
            }            
            const addedCredentials = await this.authRepository.addCredentials(newCredentials);
            const tokens = await this.getTokens(addedCredentials._id.toString(), addedCredentials.email);
            const encryptedRefreshToken = await this.hashData(tokens.refreshToken);
            newUser.refreshToken = encryptedRefreshToken;
            console.log(newUser);
            const result = this.client.send({cmd: 'create'}, newUser);
            await result.subscribe();
            return tokens;
        } catch (error) {
            throw new HttpException("Server Error", 500);
        }

    }

    async hashData(data: string) : Promise<string> {
        const salt = await bcrypt.genSalt();
        return bcrypt.hashSync(data, salt);
    }

    async login(authDto: AuthDto) {
        const {email, password} = authDto;
        const currentUser = await this.authRepository.getCredentialsByEmail(email);
        if (!currentUser) {
            throw new UnauthorizedException("Invalid email or password");
        }
        const isPasswordMatch = await currentUser.validatePassword(password);
        if (!isPasswordMatch) {
            throw new UnauthorizedException("Invalid email or password");
        }
        const tokens = await this.getTokens(currentUser._id.toString(), currentUser.email);
        const encryptedRefreshToken = await this.hashData(tokens.refreshToken);
        this.updateRefreshToken(email, encryptedRefreshToken);
        return tokens;
    }

    async logout(email: string) {
        return await this.updateRefreshToken(email, null);
    }

    async getTokens(userId: string, email: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
              {
                sub: userId,
                email: email,
              },
              {
                secret: 'secret',
                expiresIn: '5m',
              },
            ),
            this.jwtService.signAsync(
              {
                sub: userId,
                email: email,
              },
              {
                secret: 'secret',
                expiresIn: '30d',
              },
            ),
          ]);
          console.log(await this.jwtService.verifyAsync(refreshToken, {secret: 'secret'}));
          return {
            accessToken,
            refreshToken,
          };
    }

    async updateRefreshToken(email: string, refreshToken) {
        console.log(email, refreshToken);
        const result = this.client.send({cmd: 'refresh'}, {"email":email, "refreshToken": refreshToken});
        await result.subscribe();
    }

    async generateAccessTokenFromRefreshToken(userId: string, refreshToken: string) {
        console.log('refresh');
        const email = (await this.authRepository.getCredentialsById(userId)).email;
        console.log(email);

        const user = this.client.send({cmd: 'getUser'}, {"email": email});
        await user.subscribe();
        const userData = await lastValueFrom(user);
        console.log(userData);
        const userCredentials = await this.authRepository.getCredentialsByEmail(email);
        if (!userData) {
            throw new ForbiddenException('Access denied');
        }
        console.log(refreshToken);
        console.log(userData.refreshToken);
        const isRefreshTokenMatch = await bcrypt.compare(refreshToken, userData.refreshToken);
        console.log(isRefreshTokenMatch);
        if (!isRefreshTokenMatch) {
            throw new ForbiddenException('Access denied');
        }
        const newAccessToken = (await this.getTokens(userCredentials._id.toString(), email)).accessToken;
        return {'accessToken': newAccessToken};
    }


    async deleteUser(email: string) {
        const result = this.client.send({cmd: 'delete'}, {});
        await result.subscribe();
        await this.authRepository.deleteUser(email);
    }

}


