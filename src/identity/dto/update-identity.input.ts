import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateIdentityInput {
  @Field(() => Int, { description: 'example field, replace later' })
  exampleField: number;
}
