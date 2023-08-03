import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class ProgrammingLanguage {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}
