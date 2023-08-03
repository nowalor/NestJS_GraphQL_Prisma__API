import { Resolver, Query } from '@nestjs/graphql';
import { LanguagesService } from './languages.service';
import { ProgrammingLanguage } from './entity/programming-language.entity';

@Resolver()
export class LanguagesResolver {
  constructor(private readonly languagesService: LanguagesService) {}

  @Query(() => [ProgrammingLanguage], { name: 'languages' })
  findALl() {
    return this.languagesService.findAll();
  }
}
