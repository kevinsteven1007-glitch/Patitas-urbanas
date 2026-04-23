import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SolicitudFundacionesService } from './solicitud-fundaciones.service.js';
import { SolicitudFundacionesController } from './solicitud-fundaciones.controller.js';
import {
  SolicitudFundacion,
  SolicitudFundacionSchema,
} from './schemas/solicitud-fundacion.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SolicitudFundacion.name, schema: SolicitudFundacionSchema },
    ]),
  ],
  controllers: [SolicitudFundacionesController],
  providers: [SolicitudFundacionesService],
  exports: [SolicitudFundacionesService],
})
export class SolicitudFundacionesModule {}
