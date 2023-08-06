import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterUserInput } from './dto/register-user.input';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';
import { LoginInput } from './dto/login.input';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private jtwService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username);

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
        username: dto.username,
      },
    });

    console.log('user', user);

    const { id, email, username, name } = user;

    const match = await bcrypt.compare(dto.password, user.password);

    if (!match) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jtwService.sign({
      sub: id,
      email,
      username,
      name,
    });

    return { user, access_token: token };
  }
}
