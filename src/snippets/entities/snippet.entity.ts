import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserEntity } from 'src/identity/entity/user.entity';

@ObjectType()
export class Snippet {
  @Field(() => Int)
  id: number;

  @Field()
  content: string;

  @Field(() => UserEntity, { nullable: true })
  user: UserEntity;
}
