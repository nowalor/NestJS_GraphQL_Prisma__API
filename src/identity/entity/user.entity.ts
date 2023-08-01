import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class UserEntity {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  name?: string;
}
