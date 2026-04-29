import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SolicitudMascotasService } from './solicitud-mascotas.service.js';
import { SolicitudMascotasController } from './solicitud-mascotas.controller.js';
import {
  SolicitudMascota,
  SolicitudMascotaSchema,
} from './schemas/solicitud-mascota.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SolicitudMascota.name, schema: SolicitudMascotaSchema },
    ]),
  ],
  controllers: [SolicitudMascotasController],
  providers: [SolicitudMascotasService],
  exports: [SolicitudMascotasService],
})
export class SolicitudMascotasModule {}
