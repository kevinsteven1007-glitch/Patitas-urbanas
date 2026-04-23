import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { SolicitudEmergenciasService } from './solicitud-emergencias.service.js';
import { SolicitudEmergencia } from './schemas/solicitud-emergencia.schema.js';

@Controller('solicitud-emergencias')
export class SolicitudEmergenciasController {
  constructor(
    private readonly solicitudEmergenciasService: SolicitudEmergenciasService,
  ) {}

  @Post()
  create(@Body() data: Partial<SolicitudEmergencia>) {
    return this.solicitudEmergenciasService.create(data);
  }

  @Get()
  findActivas() {
    return this.solicitudEmergenciasService.findActivas();
  }

  @Get('todas')
  findAll() {
    return this.solicitudEmergenciasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solicitudEmergenciasService.findOne(id);
  }

  @Get('usuario/:idUsuario')
  findByUsuario(@Param('idUsuario') idUsuario: string) {
    return this.solicitudEmergenciasService.findByUsuario(idUsuario);
  }

  @Put(':id/respondedor')
  asignarRespondedor(
    @Param('id') id: string,
    @Body('id_respondedor') idRespondedor: string,
  ) {
    return this.solicitudEmergenciasService.asignarRespondedor(
      id,
      idRespondedor,
    );
  }

  @Put(':id/resolver')
  marcarResuelta(@Param('id') id: string) {
    return this.solicitudEmergenciasService.marcarResuelta(id);
  }
}
