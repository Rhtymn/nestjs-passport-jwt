import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import {
  AuthService,
  UserLocalInfo,
} from 'src/auth/services/auth/auth.service';
import { User } from 'src/user/decorators/user.decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user: UserLocalInfo) {
    return await this.authService.login(user);
  }

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    return await this.authService.register(body);
  }
}
