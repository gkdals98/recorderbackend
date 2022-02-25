import HttpError from "standard-http-error";
import { existsSync, mkdirSync} from "fs";
import { diskStorage } from "multer";
import uuidRandom from "./uuidRandom";

export const multerOptions = {
    fileFilter: (request, file, callback) => {
        if(file.mimetype.match(/\/(mp4))$/)) {
            callback(null, true);
        } else {
            callback(new HttpError(400, 'File Format Error'), false)
        }
    },

    storage: diskStorage({
        destination: (request, file, callback) => {
            const uploadPath: string = 'videos';

            if(!existsSync(uploadPath)) {
                mkdirSync(uploadPath);
            }

            callback(null, uploadPath);
        },

        filename: (request, file, callback) => {
            callback(null, uuidRandom(file));
        }
    })
}