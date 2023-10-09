import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    return { ...payload };
  }

}