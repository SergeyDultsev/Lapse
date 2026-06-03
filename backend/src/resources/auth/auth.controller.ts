import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '@resources/auth/auth.service';
import { LoginDto } from '@resources/auth/dto/login.dto';
import { RegisterDto } from '@resources/auth/dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }

  @Post('/register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(
      dto.username,
      dto.email,
      dto.password,
      dto.repeatPassword,
    );
  }

  // TODO: Доделать
  @Post('/logout')
  logout() {
    return 'logout';
  }

  // TODO: Доделать
  @Get('/me')
  me() {
    return 'me';
  }
}
