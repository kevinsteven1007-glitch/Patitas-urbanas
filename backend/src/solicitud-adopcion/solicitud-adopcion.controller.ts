import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { SolicitudAdopcionService } from './solicitud-adopcion.service.js';
import { SolicitudAdopcion } from './schemas/solicitud-adopcion.schema.js';

@Controller('solicitud-adopcion')
export class SolicitudAdopcionController {
  constructor(
    private readonly solicitudAdopcionService: SolicitudAdopcionService,
  ) {}

  @Post()
  create(@Body() data: Partial<SolicitudAdopcion>) {
    return this.solicitudAdopcionService.create(data);
  }

  @Get()
  findAll(@Query('estado') estado: string) {
    return this.solicitudAdopcionService.findAll(estado);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solicitudAdopcionService.findOne(id);
  }

  @Get('mascota/:idMascota')
  findByMascota(@Param('idMascota') idMascota: string) {
    return this.solicitudAdopcionService.findByMascota(idMascota);
  }

  @Get('solicitante/:idSolicitante')
  findBySolicitante(@Param('idSolicitante') idSolicitante: string) {
    return this.solicitudAdopcionService.findBySolicitante(idSolicitante);
  }

  @Get('dueno/:idDueno')
  findByDueno(@Param('idDueno') idDueno: string) {
    return this.solicitudAdopcionService.findByDueno(idDueno);
  }

  @Put(':id/estado')
  updateEstado(@Param('id') id: string, @Body('estado') estado: string) {
    return this.solicitudAdopcionService.updateEstado(id, estado);
  }
}
