import { Controller, Get, Post, Param, UseInterceptors, UploadedFile, Res, Query } from '@nestjs/common';
import { FileInterceptor }from '@nestjs/platform-express';
import { Response } from 'express';

import { ConfigService } from '@nestjs/config';

@Controller('upload')
export class AppController {
  constructor(private config: ConfigService)  {}

  @Get('/test')
  getHello(): string {
    return "Server Status OK";
  }

  @Post('/video/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File
  ) {
    //this.config => 출처 : https://docs.nestjs.com/techniques/configuration
    const path = file.path.replace(this.config.get('VIDEO_UPLOAD_PATH'), '');
    return {
      fileName: file.originalname,
      savePath: path.replace(/\\/gi, '/'),
      size: file.size,
      message: 'Upload Success',
    }
  }
  @Post('/listfile')
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @UploadedFile() file: Express.Multer.File
  ) {
    return {
      message: 'Upload Success',
    }
  }
}
