import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterUserInput } from './dto/register-user.input';
import { UserEntity } from 'src/identity/entity/user.entity';
import { LoginResponse } from './entity/login.response.entity';
import { LoginInput } from './dto/login.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserEntity)
  register(@Args('registerUserInput') dto: RegisterUserInput) {
    return this.authService.register(dto);
  }

  @Mutation(() => LoginResponse)
  login(@Args('loginInput') dto: LoginInput) {
    return this.authService.login(dto);
  }
}
