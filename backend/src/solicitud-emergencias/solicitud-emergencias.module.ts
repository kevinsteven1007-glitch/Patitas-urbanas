import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SolicitudEmergenciasService } from './solicitud-emergencias.service.js';
import { SolicitudEmergenciasController } from './solicitud-emergencias.controller.js';
import {
  SolicitudEmergencia,
  SolicitudEmergenciaSchema,
} from './schemas/solicitud-emergencia.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SolicitudEmergencia.name,
        schema: SolicitudEmergenciaSchema,
      },
    ]),
  ],
  controllers: [SolicitudEmergenciasController],
  providers: [SolicitudEmergenciasService],
  exports: [SolicitudEmergenciasService],
})
export class SolicitudEmergenciasModule {}
