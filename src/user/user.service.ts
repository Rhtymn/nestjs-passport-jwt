import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserResponseDto } from './dto/response-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
    role: UserRole,
  ): Promise<UserResponseDto> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;
    const newUser = await this.usersRepository.save({
      ...createUserDto,
      role: role,
    });
    return new UserResponseDto(newUser);
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  findUserByUsername(username: string) {
    return this.usersRepository.findOneBy({ username });
  }
}
