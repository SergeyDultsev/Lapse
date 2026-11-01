import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Пропускает запрос без токена (req.user будет undefined),
 * но валидирует токен, если он передан.
 */
@Injectable()
export class OptionalJwtGuard extends AuthGuard('jwt') {
  handleRequest<TUser = unknown>(_err: unknown, user: unknown): TUser {
    return (user ?? undefined) as TUser;
  }
}
