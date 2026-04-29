import { Controller, Get, Post, Body, Param, Put, Query } from '@nestjs/common';
import { SolicitudMascotasService } from './solicitud-mascotas.service.js';
import { SolicitudMascota } from './schemas/solicitud-mascota.schema.js';

@Controller('solicitud-mascotas')
export class SolicitudMascotasController {
  constructor(
    private readonly solicitudMascotasService: SolicitudMascotasService,
  ) {}

  @Post()
  create(@Body() data: Partial<SolicitudMascota>) {
    return this.solicitudMascotasService.create(data);
  }

  @Get()
  findAll(
    @Query('estado') estado: string,
    @Query('tipo') tipo: string,
  ) {
    if (tipo) return this.solicitudMascotasService.findByTipo(tipo);
    return this.solicitudMascotasService.findAll(estado);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solicitudMascotasService.findOne(id);
  }

  @Get('usuario/:idUsuario')
  findByUsuario(@Param('idUsuario') idUsuario: string) {
    return this.solicitudMascotasService.findByUsuario(idUsuario);
  }

  @Put(':id/estado')
  updateEstado(@Param('id') id: string, @Body('estado') estado: string) {
    return this.solicitudMascotasService.updateEstado(id, estado);
  }
}
