import {
  Controller,
  UseInterceptors,
  Post,
  UploadedFile,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { IdentityService } from './identity.service';

@Controller('identity')
export class IdentityController {
  constructor(private identityService: IdentityService) {}

  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file', { dest: 'storage/users' }))
  uploadProfileImg(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const userId = req.user['userId'];

    return this.identityService.uploadProfileImg(userId, file);
  }
}
