import { Injectable } from '@nestjs/common';
import { RegisterUserInput } from './dto/register-user.input';

@Injectable()
export class AuthService {
  register(dto: RegisterUserInput) {
    return 'success';
  }
}
