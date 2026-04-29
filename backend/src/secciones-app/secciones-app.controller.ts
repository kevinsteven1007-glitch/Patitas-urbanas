import { Controller, Get, Param, Put, Body, Query } from '@nestjs/common';
import { SeccionesAppService } from './secciones-app.service.js';
import { SeccionApp } from './schemas/seccion-app.schema.js';

@Controller('secciones-app')
export class SeccionesAppController {
  constructor(private readonly seccionesAppService: SeccionesAppService) {}

  @Get()
  findAll(@Query('rol') rol: string) {
    if (rol) return this.seccionesAppService.findByRol(rol);
    return this.seccionesAppService.findActivas();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seccionesAppService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<SeccionApp>) {
    return this.seccionesAppService.update(id, data);
  }
}
