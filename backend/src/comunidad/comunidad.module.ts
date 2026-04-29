import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComunidadService } from './comunidad.service.js';
import { ComunidadController } from './comunidad.controller.js';
import {
  ComunidadInfo,
  ComunidadInfoSchema,
} from './schemas/comunidad-info.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ComunidadInfo.name, schema: ComunidadInfoSchema },
    ]),
  ],
  controllers: [ComunidadController],
  providers: [ComunidadService],
  exports: [ComunidadService],
})
export class ComunidadModule {}
