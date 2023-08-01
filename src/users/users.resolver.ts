import { Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Query } from '@nestjs/graphql';
import { UserEntity } from 'src/identity/entity/user.entity';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query((returns) => [UserEntity], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }
}
