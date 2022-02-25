import { Injectable } from '@nestjs/common';
//import { createVideoUrl } from './lib/multerOptions';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  public uploadFiles(files: File[]): string {
    const generatedFile: string = "";

    return generatedFile;
  }
}
