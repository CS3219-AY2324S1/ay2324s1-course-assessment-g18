import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthMongoRepository } from './auth.repository';
import { AuthDto, CreateUserDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ClientProxy } from '@nestjs/microservices';


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
            // TODO: send newUser to userService after updating to microservice
            
            const addedCredentials = await this.authRepository.addCredentials(newCredentials);
            const tokens = await this.getTokens(addedCredentials._id.toString(), addedCredentials.email);
            newUser.refreshToken = tokens.refreshToken;
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
        return tokens;
    }

    logout(email: string) {}
    async getTokens(userId: string, email: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
              {
                sub: userId,
                email,
              },
              {
                secret: 'secret',
                expiresIn: '5m',
              },
            ),
            this.jwtService.signAsync(
              {
                sub: userId,
                email,
              },
              {
                secret: 'secret',
                expiresIn: '30d',
              },
            ),
          ]);
          return {
            accessToken,
            refreshToken,
          };
    }

    async updateRefreshToken(email: string, refreshToken: string) {
        const encryptedRefreshToken = this.hashData(refreshToken);
        const result = this.client.send({cmd: 'refresh'}, encryptedRefreshToken);
        await result.subscribe();
    }

    async generateAccessTokenFromRefreshToken(email: string, refreshToken: string) {
        
    }


}


