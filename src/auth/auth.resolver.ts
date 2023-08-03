import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterUserInput } from './dto/register-user.input';
import { UserEntity } from 'src/identity/entity/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserEntity)
  register(@Args('registerUserInput') dto: RegisterUserInput) {
    return this.authService.register(dto);
  }
}
