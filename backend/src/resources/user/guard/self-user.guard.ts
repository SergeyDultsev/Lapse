import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class SelfUserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const targetUserId: string = request.params.id;

    if (String(user.id) !== String(targetUserId)) {
      return false;
    }

    return true;
  }
}
