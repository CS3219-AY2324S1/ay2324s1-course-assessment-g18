import { Controller, Post, UseInterceptors, UploadedFile, Res, Delete, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { Response } from 'express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    try {
      const url = await this.uploadService.uploadFile(file);
      return res.json({ url });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  @Delete(':fileName')
  async deleteFile(@Param('fileName') fileName: string, @Res() res: Response) {
    try {
      await this.uploadService.deleteFile(fileName);
      return res.status(200).json({ message: `File ${fileName} successfully deleted` });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting file', error: error.message });
    }
  }
}
