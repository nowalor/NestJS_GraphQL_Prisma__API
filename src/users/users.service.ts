import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(email: string) {
    return this.prisma.user.findFirst({
      where: { email },
    });
  }
}
