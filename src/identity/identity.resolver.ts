import { Query, Resolver } from '@nestjs/graphql';
import { IdentityService } from './identity.service';
import { UserEntity } from './entity/user.entity';

@Resolver()
export class IdentityResolver {
  constructor(private readonly identityService: IdentityService) {}

  @Query(() => [UserEntity])
  users() {
    return [];
  }
}
