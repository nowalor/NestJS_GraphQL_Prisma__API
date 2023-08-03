import { Module } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { LanguagesResolver } from './languages.resolver';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [LanguagesResolver, LanguagesService, PrismaService],
})
export class LanguagesModule {}
