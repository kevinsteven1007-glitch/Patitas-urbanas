import { Controller, Get, Post, Body, Param, Put, Query } from '@nestjs/common';
import { SolicitudVeterinariasService } from './solicitud-veterinarias.service.js';
import { SolicitudVeterinaria } from './schemas/solicitud-veterinaria.schema.js';

@Controller('solicitud-veterinarias')
export class SolicitudVeterinariasController {
  constructor(
    private readonly solicitudVeterinariasService: SolicitudVeterinariasService,
  ) {}

  @Post()
  create(@Body() data: Partial<SolicitudVeterinaria>) {
    return this.solicitudVeterinariasService.create(data);
  }

  @Get()
  findAll(@Query('estado') estado: string) {
    return this.solicitudVeterinariasService.findAll(estado);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solicitudVeterinariasService.findOne(id);
  }

  @Get('usuario/:idUsuario')
  findByUsuario(@Param('idUsuario') idUsuario: string) {
    return this.solicitudVeterinariasService.findByUsuario(idUsuario);
  }

  @Get('veterinaria/:idVeterinaria')
  findByVeterinaria(@Param('idVeterinaria') idVeterinaria: string) {
    return this.solicitudVeterinariasService.findByVeterinaria(idVeterinaria);
  }

  @Put(':id/estado')
  updateEstado(@Param('id') id: string, @Body('estado') estado: string) {
    return this.solicitudVeterinariasService.updateEstado(id, estado);
  }
}
