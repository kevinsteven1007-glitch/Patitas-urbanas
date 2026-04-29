import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SolicitudAdopcionService } from './solicitud-adopcion.service.js';
import { SolicitudAdopcionController } from './solicitud-adopcion.controller.js';
import {
  SolicitudAdopcion,
  SolicitudAdopcionSchema,
} from './schemas/solicitud-adopcion.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SolicitudAdopcion.name, schema: SolicitudAdopcionSchema },
    ]),
  ],
  controllers: [SolicitudAdopcionController],
  providers: [SolicitudAdopcionService],
  exports: [SolicitudAdopcionService],
})
export class SolicitudAdopcionModule {}
