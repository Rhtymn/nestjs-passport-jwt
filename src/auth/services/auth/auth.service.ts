import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { UserRole } from 'src/user/entities/user.entity';

export interface UserLocalInfo {
  id: number;
  username: string;
  password: string;
  isActive: boolean;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findUserByUsername(username);
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (user && isPasswordMatch) {
      return user;
    }
    return null;
  }

  async login(user: UserLocalInfo) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: CreateUserDto, role: UserRole) {
    const userOnDB = await this.userService.findUserByUsername(user.username);

    if (userOnDB) {
      throw new NotAcceptableException('Username already exists');
    }

    return this.userService.create(user, role);
  }
}
