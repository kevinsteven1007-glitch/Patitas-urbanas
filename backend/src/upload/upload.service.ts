import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Storage } from '@google-cloud/storage';
import { randomUUID } from 'crypto';
import * as path from 'path';

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);
  private storage: Storage;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    const projectId = this.configService.get<string>('GCS_PROJECT_ID');
    const credentialsPath = this.configService.get<string>(
      'GCS_CREDENTIALS_PATH',
    );
    this.bucketName = this.configService.get<string>(
      'GCS_BUCKET_NAME',
      'patitas-urbanas-imagenes',
    );

    this.storage = new Storage({
      projectId,
      keyFilename: credentialsPath,
    });

    this.logger.log(
      `Google Cloud Storage inicializado — Bucket: ${this.bucketName}`,
    );
  }

  /**
   * Sube un archivo al bucket de GCS y retorna la URL pública.
   */
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const ext = path.extname(file.originalname).toLowerCase();
    const fileName = `mascotas/${randomUUID()}${ext}`;

    const bucket = this.storage.bucket(this.bucketName);
    const blob = bucket.file(fileName);

    await blob.save(file.buffer, {
      metadata: {
        contentType: file.mimetype,
      },
    });

    const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${fileName}`;
    this.logger.log(`Imagen subida exitosamente: ${publicUrl}`);
    return publicUrl;
  }

  /**
   * Elimina un archivo del bucket de GCS dado su URL pública.
   */
  async deleteFile(fileUrl: string): Promise<void> {
    try {
      const fileName = fileUrl.replace(
        `https://storage.googleapis.com/${this.bucketName}/`,
        '',
      );
      await this.storage.bucket(this.bucketName).file(fileName).delete();
      this.logger.log(`Imagen eliminada: ${fileName}`);
    } catch (error) {
      this.logger.warn(`No se pudo eliminar la imagen: ${error.message}`);
    }
  }
}
