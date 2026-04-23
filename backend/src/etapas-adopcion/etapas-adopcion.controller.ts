import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { EtapasAdopcionService } from './etapas-adopcion.service.js';
import { EtapaAdopcion } from './schemas/etapa-adopcion.schema.js';

@Controller('etapas-adopcion')
export class EtapasAdopcionController {
  constructor(
    private readonly etapasAdopcionService: EtapasAdopcionService,
  ) {}

  @Post()
  create(@Body() data: Partial<EtapaAdopcion>) {
    return this.etapasAdopcionService.create(data);
  }

  @Get('solicitud/:idSolicitud')
  findBySolicitud(@Param('idSolicitud') idSolicitud: string) {
    return this.etapasAdopcionService.findBySolicitud(idSolicitud);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.etapasAdopcionService.findOne(id);
  }

  @Put(':id/completar')
  marcarCompletada(@Param('id') id: string) {
    return this.etapasAdopcionService.marcarCompletada(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<EtapaAdopcion>) {
    return this.etapasAdopcionService.update(id, data);
  }
}
