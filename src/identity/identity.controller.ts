import { Controller, Post } from '@nestjs/common';

@Controller('identity')
export class IdentityController {
  @Post()
  uploadProfileImg() {}
}
