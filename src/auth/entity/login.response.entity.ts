import { ObjectType, Field } from '@nestjs/graphql';
import { UserEntity } from 'src/identity/entity/user.entity';

@ObjectType()
export class LoginResponse {
  @Field(() => UserEntity)
  user: UserEntity;

  @Field()
  access_token: string;
}
