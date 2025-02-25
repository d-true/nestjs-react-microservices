import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../user/enteties/user.entity';

import { ConfigService } from '@nestjs/config';
import { writeFile, unlink } from 'fs';

import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

import { File } from './file.types';

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly configService: ConfigService,
    ) {}

    async uploadFile(file: File): Promise<string> {
        const uploadFilePath: string =
            this.configService.getOrThrow('app.uploadFilePath');
        const fileName = uuidv4() + extname(file.originalname as string);

        await new Promise((resolve, reject) => {
            writeFile(
                uploadFilePath + fileName,
                Buffer.from(file.buffer),
                (err: Error) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(true);
                },
            );
        });

        return fileName;
    }

    async deleteFile(fileName: string): Promise<boolean> {
        const uploadFilePath: string =
            this.configService.getOrThrow('app.uploadFilePath');
        return new Promise((resolve, reject) => {
            unlink(uploadFilePath + fileName, (err: Error) => {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            });
        });
    }
}
