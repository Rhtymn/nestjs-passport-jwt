import {
  Body,
  Controller,
  Inject,
  Param,
  ParseEnumPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import {
  AuthService,
  UserLocalInfo,
} from 'src/auth/services/auth/auth.service';
import { User } from 'src/user/decorators/user.decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserRole } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user: UserLocalInfo) {
    return await this.authService.login(user);
  }

  @Post('register/:role')
  async register(
    @Body() body: CreateUserDto,
    @Param('role', new ParseEnumPipe(UserRole)) role: UserRole,
  ) {
    return await this.authService.register(body, role);
  }
}
