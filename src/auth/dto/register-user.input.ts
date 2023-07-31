import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RegisterUserInput {
  @Field()
  email: String;

  @Field()
  password: String;

  @Field()
  username: String;
}
