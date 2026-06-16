import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param(':id') userId) {
    const { user } = await this.userService.getUser(userId);

    return {
      data: user,
      message: 'User',
      statusCode: HttpStatus.OK,
    };
  }
}
