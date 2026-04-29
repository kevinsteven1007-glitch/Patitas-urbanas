import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SolicitudRecomendacionService } from './solicitud-recomendacion.service.js';
import { SolicitudRecomendacionController } from './solicitud-recomendacion.controller.js';
import {
  SolicitudRecomendacion,
  SolicitudRecomendacionSchema,
} from './schemas/solicitud-recomendacion.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SolicitudRecomendacion.name,
        schema: SolicitudRecomendacionSchema,
      },
    ]),
  ],
  controllers: [SolicitudRecomendacionController],
  providers: [SolicitudRecomendacionService],
  exports: [SolicitudRecomendacionService],
})
export class SolicitudRecomendacionModule {}
