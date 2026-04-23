import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MascotasService } from './mascotas.service.js';
import { MascotasController } from './mascotas.controller.js';
import { Mascota, MascotaSchema } from './schemas/mascota.schema.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: Mascota.name, schema: MascotaSchema }])],
  controllers: [MascotasController],
  providers: [MascotasService],
  exports: [MascotasService],
})
export class MascotasModule {}
