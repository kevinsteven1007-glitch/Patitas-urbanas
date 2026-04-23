import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { EntidadesService } from './entidades.service.js';
import { Entidad } from './schemas/entidad.schema.js';

@Controller('entidades')
export class EntidadesController {
  constructor(private readonly entidadesService: EntidadesService) {}

  @Post()
  create(@Body() data: Partial<Entidad>) {
    return this.entidadesService.create(data);
  }

  @Get()
  findAll(@Query('tipo') tipo: string) {
    return this.entidadesService.findAll(tipo);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entidadesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Entidad>) {
    return this.entidadesService.update(id, data);
  }

  @Delete(':id')
  deactivate(@Param('id') id: string) {
    return this.entidadesService.deactivate(id);
  }
}
