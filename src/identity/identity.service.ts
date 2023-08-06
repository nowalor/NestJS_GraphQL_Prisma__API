import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateIdentityInput } from './dto/update-identity.input';
import { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class IdentityService {
  constructor(private prisma: PrismaService) {}

  async identity(userId: number, page: number) {
    const perPage = 2;

    const [user, snippetCount] = await Promise.all([
      this.prisma.user.findFirst({
        where: {
          id: userId,
        },
        include: {
          snippets: {
            include: {
              programmingLanguage: true,
            },
            skip: (page - 1) * perPage,
            take: perPage,
          },
        },
      }),
      this.prisma.snippet.count({
        where: {
          userId,
        },
      }),
    ]);

    const totalPages = Math.ceil(snippetCount / perPage);

    return {
      ...user,
      snippets: {
        items: user.snippets,
        total: snippetCount,
        totalPages,
      },
    };
  }

  async update(updateIdentityInput: UpdateIdentityInput) {
    // Code goes here
  }

  async uploadProfileImg(userId: number, file: Express.Multer.File) {
    // Save the uploaded file with the user's id and original file extension.
    const ext = path.extname(file.originalname);
    const newFilename = `${userId}/profile${ext}`;
    const filePath = path.join('storage/users', newFilename);

    // Create the directory if it doesn't exist.
    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    // Move the uploaded file to the desired location with the new filename.
    fs.renameSync(file.path, filePath);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        profileImgUrl: `http://localhost:5000/assets/users/${userId}/profile${ext}`,
      },
    });

    return true;
  }
}
