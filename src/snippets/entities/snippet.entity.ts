import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Snippet {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
