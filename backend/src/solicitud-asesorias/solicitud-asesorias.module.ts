import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SolicitudAsesoriasService } from './solicitud-asesorias.service.js';
import { SolicitudAsesoriasController } from './solicitud-asesorias.controller.js';
import {
  SolicitudAsesoria,
  SolicitudAsesoriaSchema,
} from './schemas/solicitud-asesoria.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SolicitudAsesoria.name, schema: SolicitudAsesoriaSchema },
    ]),
  ],
  controllers: [SolicitudAsesoriasController],
  providers: [SolicitudAsesoriasService],
  exports: [SolicitudAsesoriasService],
})
export class SolicitudAsesoriasModule {}
