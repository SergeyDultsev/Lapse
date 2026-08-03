import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

export type JwtPayload = {
  id: string;
  email: string;
};

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const secret = configService.get<string>('jwt.refreshsecret');
    if (!secret) throw new Error('JWT is not defined');

    super({
      jwtFromRequest: (req: Request) => {
        return req.cookies?.refreshToken;
      },
      secretOrKey: secret,
    });
  }

  async validate(payload: JwtPayload) {
    return { payload };
  }
}
