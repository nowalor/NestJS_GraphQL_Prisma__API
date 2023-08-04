import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterUserInput } from './dto/register-user.input';
import { UserEntity } from 'src/identity/entity/user.entity';
import { LoginResponse } from './entity/login.response.entity';
import { LoginInput } from './dto/login.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserEntity)
  register(@Args('registerUserInput') dto: RegisterUserInput) {
    return this.authService.register(dto);
  }

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(@Args('loginInput') dto: LoginInput, @Context() context) {
    console.log({ context: context });
    return this.authService.login(dto);
  }
}
