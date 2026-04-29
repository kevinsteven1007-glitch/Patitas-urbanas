import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeccionesAppService } from './secciones-app.service.js';
import { SeccionesAppController } from './secciones-app.controller.js';
import {
  SeccionApp,
  SeccionAppSchema,
} from './schemas/seccion-app.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SeccionApp.name, schema: SeccionAppSchema },
    ]),
  ],
  controllers: [SeccionesAppController],
  providers: [SeccionesAppService],
  exports: [SeccionesAppService],
})
export class SeccionesAppModule {}
