import { Query, Resolver, Context } from '@nestjs/graphql';
import { IdentityService } from './identity.service';
import { UserEntity } from './entity/user.entity';
import { Injectable, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Injectable()
@Resolver()
export class IdentityResolver {
  constructor(private readonly identityService: IdentityService) {}

  @Query(() => UserEntity, { name: 'identity' })
  @UseGuards(JwtAuthGuard)
  identity(@Context() context) {
    return this.identityService.identity(context.req.user.userId);
  }
}
