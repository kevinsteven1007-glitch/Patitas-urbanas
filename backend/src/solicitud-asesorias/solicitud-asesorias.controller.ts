import { Controller, Get, Post, Body, Param, Put, Query } from '@nestjs/common';
import { SolicitudAsesoriasService } from './solicitud-asesorias.service.js';
import { SolicitudAsesoria } from './schemas/solicitud-asesoria.schema.js';

@Controller('solicitud-asesorias')
export class SolicitudAsesoriasController {
  constructor(
    private readonly solicitudAsesoriasService: SolicitudAsesoriasService,
  ) {}

  @Post()
  create(@Body() data: Partial<SolicitudAsesoria>) {
    return this.solicitudAsesoriasService.create(data);
  }

  @Get()
  findAll(@Query('estado') estado: string) {
    return this.solicitudAsesoriasService.findAll(estado);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solicitudAsesoriasService.findOne(id);
  }

  @Get('usuario/:idUsuario')
  findByUsuario(@Param('idUsuario') idUsuario: string) {
    return this.solicitudAsesoriasService.findByUsuario(idUsuario);
  }

  @Get('experto/:idExperto')
  findByExperto(@Param('idExperto') idExperto: string) {
    return this.solicitudAsesoriasService.findByExperto(idExperto);
  }

  @Put(':id/respuesta')
  registrarRespuesta(
    @Param('id') id: string,
    @Body('respuesta') respuesta: string,
  ) {
    return this.solicitudAsesoriasService.registrarRespuesta(id, respuesta);
  }
}
