import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String)
  index() {
    return 'Welcome to the API';
  }
}
