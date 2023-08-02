import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { NeedRole } from 'src/auth/role.decorator';
import { Role } from 'src/auth/role.enum';



@Controller('file')
@ApiTags('file')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @ApiBearerAuth()
  @NeedRole(Role.Admin)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file.filename
  }

}
