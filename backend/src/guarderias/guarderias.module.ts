import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Guarderia, GuarderiaSchema } from './schemas/guarderia.schema.js';
import { GuarderiasService } from './guarderias.service.js';
import { GuarderiasController } from './guarderias.controller.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Guarderia.name, schema: GuarderiaSchema },
    ]),
  ],
  controllers: [GuarderiasController],
  providers: [GuarderiasService],
})
export class GuarderiasModule {}
