import { Injectable } from '@nestjs/common';
import { CreateSnippetInput } from './dto/create-snippet.input';
import { UpdateSnippetInput } from './dto/update-snippet.input';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class SnippetsService {
  constructor(private prisma: PrismaService) {}

  create(createSnippetInput: CreateSnippetInput) {
    return 'This action adds a new snippet';
  }

  findAll() {
    return this.prisma.snippet.findMany({
      include: {
        user: true, // This will include the associated UserEntity for each Snippet
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} snippet`;
  }

  update(id: number, updateSnippetInput: UpdateSnippetInput) {
    return `This action updates a #${id} snippet`;
  }

  remove(id: number) {
    return `This action removes a #${id} snippet`;
  }
}
