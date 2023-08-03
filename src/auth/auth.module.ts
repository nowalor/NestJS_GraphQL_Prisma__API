import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy.local';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthResolver, AuthService, PrismaService, LocalStrategy],
})
export class AuthModule {}
