import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @HttpCode(200)
  async findUserById(@Param('id') userId: string) {
    const user = await this.userService.getUser(userId);

    return {
      data: user,
      message: 'User',
      statusCode: HttpStatus.OK,
    };
  }

  @HttpCode(200)
  async usersAll() {
    const users = await this.userService.getAll();

    return {
      data: users,
      message: 'All',
      statusCode: HttpStatus.OK,
    };
  }
}
