import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SolicitudRecomendacionService } from './solicitud-recomendacion.service.js';
import { SolicitudRecomendacion } from './schemas/solicitud-recomendacion.schema.js';

@Controller('solicitud-recomendacion')
export class SolicitudRecomendacionController {
  constructor(
    private readonly solicitudRecomendacionService: SolicitudRecomendacionService,
  ) {}

  @Post()
  create(@Body() data: Partial<SolicitudRecomendacion>) {
    return this.solicitudRecomendacionService.create(data);
  }

  @Get()
  findAll() {
    return this.solicitudRecomendacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solicitudRecomendacionService.findOne(id);
  }

  @Get('entidad/:idEntidad')
  findByEntidad(@Param('idEntidad') idEntidad: string) {
    return this.solicitudRecomendacionService.findByEntidad(idEntidad);
  }

  @Get('entidad/:idEntidad/promedio')
  promedioCalificacion(@Param('idEntidad') idEntidad: string) {
    return this.solicitudRecomendacionService.promedioCalificacion(
      idEntidad,
    );
  }

  @Get('usuario/:idUsuario')
  findByUsuario(@Param('idUsuario') idUsuario: string) {
    return this.solicitudRecomendacionService.findByUsuario(idUsuario);
  }
}
