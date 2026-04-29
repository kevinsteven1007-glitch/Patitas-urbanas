import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SolicitudVeterinariasService } from './solicitud-veterinarias.service.js';
import { SolicitudVeterinariasController } from './solicitud-veterinarias.controller.js';
import {
  SolicitudVeterinaria,
  SolicitudVeterinariaSchema,
} from './schemas/solicitud-veterinaria.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SolicitudVeterinaria.name,
        schema: SolicitudVeterinariaSchema,
      },
    ]),
  ],
  controllers: [SolicitudVeterinariasController],
  providers: [SolicitudVeterinariasService],
  exports: [SolicitudVeterinariasService],
})
export class SolicitudVeterinariasModule {}
