import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { diskStorage } from 'multer';
import { format } from 'light-date';
import { extname } from 'path';

import * as fs from 'fs';

//출처 - https://stove99.github.io/nodejs/2021/04/20/nestjs-file-upload/
@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        storage: diskStorage({
          destination: (req, file, cb) => {
            //날짜를 기반으로 파일 저장 위치를 생성 및 지정.
            const dest = `${config.get('ATTACH_SAVE_PATH')}/${format(new Date(), '{yyyy}{MM}')}/`;
            if(!fs.existsSync(dest)) {
              fs.mkdirSync(dest, { recursive: true });
            }

            cb(null, dest);
          },
          filename: (req, file, cb) => {
            //파일명을 랜덤으로 생성해줌.... 네?
            const randomName = Array(32)
              .fill(null)
              .map(() => Math.round(Math.random() * 16).toString(16))
              .join('');
            return cb(null, `${randomName}${extname(file.originalname)}`);
          },
        }),
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
