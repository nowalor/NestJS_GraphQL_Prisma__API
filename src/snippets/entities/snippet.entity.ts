import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserEntity } from 'src/identity/entity/user.entity';
import { ProgrammingLanguage } from 'src/languages/entity/programming-language.entity';

@ObjectType()
export class Tag {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}

@ObjectType()
export class Snippet {
  @Field(() => Int)
  id: number;

  @Field()
  content: string;

  @Field(() => UserEntity)
  user: UserEntity;

  @Field(() => ProgrammingLanguage)
  programmingLanguage: ProgrammingLanguage;

  @Field(() => [Tag])
  tags: Tag[];
}
