import { Field, ObjectType, Int } from '@nestjs/graphql';
import { UserEntity } from './user.entity';
import { PaginatedSnippetsEntity } from 'src/snippets/entities/paginated-snippets.entity';

@ObjectType()
export class IdentityEntity extends UserEntity {
  @Field(() => PaginatedSnippetsEntity)
  snippets: [PaginatedSnippetsEntity];
}
