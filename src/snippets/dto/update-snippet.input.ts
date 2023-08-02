import { CreateSnippetInput } from './create-snippet.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSnippetInput extends PartialType(CreateSnippetInput) {
  @Field(() => Int)
  id: number;
}
