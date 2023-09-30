import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, CreateUserDto } from './dto/auth.dto';
import { Request } from 'express';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { AccessTokenGuard } from './guards/accessToken.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
      ) {}
    
      @Post('sign-up')
      async signUp(@Body() CreateUserDto: CreateUserDto) {
        return this.authService.signUp(CreateUserDto);
      }

      @Post('login')
      async login(@Body() authDto: AuthDto) {
        return this.authService.login(authDto);
      }

      @UseGuards(RefreshTokenGuard)
      @Get('refresh')
      async refreshAccessToken(@Req() req: Request) {
        const userId = req.user['sub'];
        const refreshToken = req.user['refreshToken'];
        return this.authService.generateAccessTokenFromRefreshToken(userId, refreshToken);
      }

      @UseGuards(AccessTokenGuard)
      @Delete('delete/:email')
      async deleteUser(@Param('email') email: string) {
        await this.authService.deleteUser(email);
      }

      @UseGuards(AccessTokenGuard)
      @Get('logout')
      async logout(@Req() req: Request) {
        console.log("logout: " + req.user['email']);
        console.log("logout: " + req.user['sub']);
        const email = req.user['email'];
        console.log(email);
        return await this.authService.logout(req.user['email']);
      }
}
