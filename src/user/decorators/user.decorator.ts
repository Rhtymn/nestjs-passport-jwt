import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export interface UserInfo {
  id: number;
  username: string;
}

export const User = createParamDecorator((_, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return request.user;
});
