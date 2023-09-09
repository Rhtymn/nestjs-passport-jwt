import { Exclude } from 'class-transformer';

export class UserResponseDto {
  id: number;
  username: string;

  @Exclude()
  password: string;

  @Exclude()
  isActive: boolean;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
