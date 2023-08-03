import { Injectable } from '@nestjs/common';
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

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email);
    console.log('validate user line 19 user:', user);

    const match = bcrypt.compare(password, user.password);
    console.log('validate user line 19 match:', match);

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

    const { id, email, username, name } = user;

    const match = bcrypt.compare(dto.password, user.password);

    console.log({
      password1: dto.password,
      password2: user.password,
    });

    if (!match) {
      return { error: 'waa' };
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
