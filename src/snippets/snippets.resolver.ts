import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SnippetsService } from './snippets.service';
import { Snippet } from './entities/snippet.entity';
import { CreateSnippetInput } from './dto/create-snippet.input';
import { UpdateSnippetInput } from './dto/update-snippet.input';

@Resolver(() => Snippet)
export class SnippetsResolver {
  constructor(private readonly snippetsService: SnippetsService) {}

  @Mutation(() => Snippet)
  createSnippet(@Args('createSnippetInput') createSnippetInput: CreateSnippetInput) {
    return this.snippetsService.create(createSnippetInput);
  }

  @Query(() => [Snippet], { name: 'snippets' })
  findAll() {
    return this.snippetsService.findAll();
  }

  @Query(() => Snippet, { name: 'snippet' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.snippetsService.findOne(id);
  }

  @Mutation(() => Snippet)
  updateSnippet(@Args('updateSnippetInput') updateSnippetInput: UpdateSnippetInput) {
    return this.snippetsService.update(updateSnippetInput.id, updateSnippetInput);
  }

  @Mutation(() => Snippet)
  removeSnippet(@Args('id', { type: () => Int }) id: number) {
    return this.snippetsService.remove(id);
  }
}
