import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from './user.entity';
import { Snippet } from 'src/snippets/entities/snippet.entity';

@ObjectType()
export class IdentityEntity extends UserEntity {
  @Field(() => [Snippet])
  snippets: [Snippet];
}
