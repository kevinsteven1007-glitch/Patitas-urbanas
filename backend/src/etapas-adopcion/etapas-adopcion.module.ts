import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EtapasAdopcionService } from './etapas-adopcion.service.js';
import { EtapasAdopcionController } from './etapas-adopcion.controller.js';
import {
  EtapaAdopcion,
  EtapaAdopcionSchema,
} from './schemas/etapa-adopcion.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EtapaAdopcion.name, schema: EtapaAdopcionSchema },
    ]),
  ],
  controllers: [EtapasAdopcionController],
  providers: [EtapasAdopcionService],
  exports: [EtapasAdopcionService],
})
export class EtapasAdopcionModule {}
