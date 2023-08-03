import { Injectable } from '@nestjs/common';
import { RegisterUserInput } from './dto/register-user.input';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(dto: RegisterUserInput) {
    const hash = await bcrypt.hash(dto.password, 10);

    return this.prisma.user.create({
      data: { ...dto, password: hash },
    });
  }
}
