import { Injectable } from '@nestjs/common';
import { RegisterUserInput } from './dto/register-user.input';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';
import { LoginInput } from './dto/login.input';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email);

    const match = bcrypt.compare(password, user.password);

    if (!match) {
      throw Error('Match not found auth.service line 21');
    }

    return user;
  }

  async register(dto: RegisterUserInput) {
    const hash = await bcrypt.hash(dto.password, 10);

    return this.prisma.user.create({
      data: { ...dto, password: hash },
    });
  }

  async login(dto: LoginInput) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });

    return { user, access_token: 'hello' };
  }
}
