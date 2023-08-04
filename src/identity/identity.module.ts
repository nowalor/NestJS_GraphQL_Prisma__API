import { Module } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { IdentityResolver } from './identity.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  providers: [IdentityResolver, IdentityService, PrismaService, JwtStrategy],
})
export class IdentityModule {}
