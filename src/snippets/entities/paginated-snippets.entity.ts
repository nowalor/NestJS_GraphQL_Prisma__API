import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Snippet } from './snippet.entity';

@ObjectType()
export class PaginatedSnippetsEntity {
  @Field(() => [Snippet])
  items: Snippet[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  totalPages: number;
}
