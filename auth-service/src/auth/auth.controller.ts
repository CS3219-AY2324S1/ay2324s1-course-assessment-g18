import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { AuthDto, CreateUserDto, RefreshTokenDto, TokenDto, UpdatePasswordDto } from './dto/auth.dto';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { GoogleOauthGuard } from './guards/google-oauth.guard';

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

      @UseGuards(AccessTokenGuard)
      @Post('tokens') 
      async generateTokensWithRole(@Body() tokenDto: TokenDto) {
        const {email, role} = tokenDto;
        return this.authService.generateTokenWithRole(email, role);
      }

      @UseGuards(RefreshTokenGuard)
      @Post('refresh')
      async refreshAccessToken(@Req() req: Request, @Body() refreshTokenDto: RefreshTokenDto) {
        const userId = req.user['sub'];
        const refreshToken = req.user['refreshToken'];
        
        const role = req.user['role'];
        const userRefreshToken = refreshTokenDto.refreshToken;
        return this.authService.generateAccessTokenFromRefreshToken(userId, refreshToken, userRefreshToken, role);
      }

      @UseGuards(AccessTokenGuard)
      @Delete('delete/:email')
      async deleteUser(@Param('email') email: string) {
        await this.authService.deleteUser(email);
      }


      @Get('to-google')
      @UseGuards(GoogleOauthGuard)
      async googleAuth(@Req() req: Request) {

      }

      @UseGuards(AccessTokenGuard)
      @Put('update')
      async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
        console.log(updatePasswordDto);
        return await this.authService.updatePassword(updatePasswordDto);
      }

      @Get('google')
      @UseGuards(GoogleOauthGuard)
      async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
        const {user} = req;
        const newUser: CreateUserDto = {"email": user['email'], "providerId": user['providerId']}
        // res.redirect("http://localhost:5173/login");
        return await this.authService.oauthLogin(newUser);
      }

      @Post('oauthLogin')
      async oauthLogin(@Body() creatUserDto: CreateUserDto) {
        return await this.authService.oauthLogin(creatUserDto);
      }
}
