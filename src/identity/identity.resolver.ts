import { Query, Resolver, Context, Args } from '@nestjs/graphql';
import { IdentityService } from './identity.service';
import { Injectable, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { IdentityEntity } from './entity/identity.entity';

@Injectable()
@Resolver()
export class IdentityResolver {
  constructor(private readonly identityService: IdentityService) {}

  @Query(() => IdentityEntity, { name: 'identity' })
  @UseGuards(JwtAuthGuard)
  identity(
    @Context() context,
    @Args('snippetPage', { nullable: true }) page: number = 1,
  ) {
    return this.identityService.identity(context.req.user.userId, page);
  }
}
