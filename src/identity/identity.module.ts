import { Module } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { IdentityResolver } from './identity.resolver';

@Module({
  providers: [IdentityResolver, IdentityService]
})
export class IdentityModule {}
