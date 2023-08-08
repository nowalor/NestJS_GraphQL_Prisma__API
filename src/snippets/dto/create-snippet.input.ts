import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSnippetInput {
  @Field(() => Int)
  programmingLanguageId: number;

  @Field()
  title: string;

  @Field()
  content: string;
}
