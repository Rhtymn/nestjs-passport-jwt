import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { User, UserInfo } from './user/decorators/user.decorator';
import { AuthorizationGuard } from './auth/guards/authorization.guard';
import { Roles } from './decorators/roles.decorator';
import { UserRole } from './user/entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@User() user: UserInfo) {
    return user;
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Get('hello')
  getHello(): string {
    return 'Hello World!';
  }
}
