import { Controller, Get, Post, Body, Param, Put, Query } from '@nestjs/common';
import { SolicitudFundacionesService } from './solicitud-fundaciones.service.js';
import { SolicitudFundacion } from './schemas/solicitud-fundacion.schema.js';

@Controller('solicitud-fundaciones')
export class SolicitudFundacionesController {
  constructor(
    private readonly solicitudFundacionesService: SolicitudFundacionesService,
  ) {}

  @Post()
  create(@Body() data: Partial<SolicitudFundacion>) {
    return this.solicitudFundacionesService.create(data);
  }

  @Get()
  findAll(@Query('tipo') tipo: string) {
    if (tipo) return this.solicitudFundacionesService.findByTipo(tipo);
    return this.solicitudFundacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solicitudFundacionesService.findOne(id);
  }

  @Get('donante/:idDonante')
  findByDonante(@Param('idDonante') idDonante: string) {
    return this.solicitudFundacionesService.findByDonante(idDonante);
  }

  @Get('fundacion/:idFundacion')
  findByFundacion(@Param('idFundacion') idFundacion: string) {
    return this.solicitudFundacionesService.findByFundacion(idFundacion);
  }

  @Put(':id/estado')
  updateEstado(@Param('id') id: string, @Body('estado') estado: string) {
    return this.solicitudFundacionesService.updateEstado(id, estado);
  }
}
