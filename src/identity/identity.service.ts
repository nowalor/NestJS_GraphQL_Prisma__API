import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateIdentityInput } from './dto/update-identity.input';

@Injectable()
export class IdentityService {
  constructor(private prisma: PrismaService) {}

  async identity(userId: number, page: number) {
    const perPage = 2;

    const [user, snippetCount] = await Promise.all([
      this.prisma.user.findFirst({
        where: {
          id: userId,
        },
        include: {
          snippets: {
            include: {
              programmingLanguage: true,
            },
            skip: (page - 1) * perPage,
            take: perPage,
          },
        },
      }),
      this.prisma.snippet.count({
        where: {
          userId,
        },
      }),
    ]);

    const totalPages = Math.ceil(snippetCount / perPage);

    return {
      ...user,
      snippets: {
        items: user.snippets,
        total: snippetCount,
        totalPages,
      },
    };
  }

  update(updateIdentityInput: UpdateIdentityInput) {}
}
