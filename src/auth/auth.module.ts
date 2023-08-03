import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy.local';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: '30s' },
      secret: 'secret-replace-later', // TODO
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    PrismaService,
    LocalStrategy,
    UsersService,
  ],
})
export class AuthModule {}
