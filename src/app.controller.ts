import { Controller, Get, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor }from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller('upload')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/sample')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File
  ) {
    console.log('file uploaded ', file);
    return {
      message: 'Upload Success',
    }
  }
  @Post('/file')
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @UploadedFile() file: Express.Multer.File
  ) {
    console.log('file uploaded ', file);
    return {
      message: 'Upload Success',
    }
  }
}
