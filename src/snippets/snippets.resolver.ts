import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { SnippetsService } from './snippets.service';
import { Snippet } from './entities/snippet.entity';
import { CreateSnippetInput } from './dto/create-snippet.input';
import { UpdateSnippetInput } from './dto/update-snippet.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Resolver(() => Snippet)
export class SnippetsResolver {
  constructor(private readonly snippetsService: SnippetsService) {}

  @Mutation(() => Snippet)
  @UseGuards(JwtAuthGuard)
  createSnippet(
    @Args('createSnippetInput') createSnippetInput: CreateSnippetInput,
    @Context() context,
  ) {
    const { userId } = context.req.user;

    return this.snippetsService.create(createSnippetInput, userId);
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
  updateSnippet(
    @Args('updateSnippetInput') updateSnippetInput: UpdateSnippetInput,
  ) {
    return this.snippetsService.update(
      updateSnippetInput.id,
      updateSnippetInput,
    );
  }

  @Mutation(() => Snippet)
  removeSnippet(@Args('id', { type: () => Int }) id: number) {
    return this.snippetsService.remove(id);
  }
}
