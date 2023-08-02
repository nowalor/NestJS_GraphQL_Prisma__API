import { Module } from '@nestjs/common';
import { SnippetsService } from './snippets.service';
import { SnippetsResolver } from './snippets.resolver';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [SnippetsResolver, SnippetsService, PrismaService],
})
export class SnippetsModule {}
