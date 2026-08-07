import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@resources/user/entites/user.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';

export type JwtPayload = {
  id: string;
  email: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    const secret = configService.get<string>('jwt.secret');
    if (!secret) throw new Error('JWT is not defined');

    super({
      jwtFromRequest: (req: Request) => {
        return req.cookies?.accessToken;
      },
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userRepository.findOne({
      where: { userId: payload.id },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      userId: user.userId,
      email: user.email,
      username: user.username,
    };
  }
}
