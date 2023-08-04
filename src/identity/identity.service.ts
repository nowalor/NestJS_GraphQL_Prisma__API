import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class IdentityService {
  constructor(private prisma: PrismaService) {}

  identity(userId: number) {
    return this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
  }
}
