import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EntidadesService } from './entidades.service.js';
import { EntidadesController } from './entidades.controller.js';
import { Entidad, EntidadSchema } from './schemas/entidad.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Entidad.name, schema: EntidadSchema },
    ]),
  ],
  controllers: [EntidadesController],
  providers: [EntidadesService],
  exports: [EntidadesService],
})
export class EntidadesModule {}
