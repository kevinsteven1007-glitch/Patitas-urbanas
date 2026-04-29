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
import { ComunidadService } from './comunidad.service.js';
import { ComunidadInfo, Comentario } from './schemas/comunidad-info.schema.js';

@Controller('comunidad')
export class ComunidadController {
  constructor(private readonly comunidadService: ComunidadService) {}

  @Post()
  create(@Body() data: Partial<ComunidadInfo>) {
    return this.comunidadService.create(data);
  }

  @Get()
  findAll(@Query('tipo') tipo: string, @Query('limit') limit: string) {
    if (tipo) return this.comunidadService.findByTipo(tipo);
    return this.comunidadService.findAll(limit ? parseInt(limit, 10) : 20);
  }

  @Get('autor/:autorId')
  findByAutor(@Param('autorId') autorId: string) {
    return this.comunidadService.findByAutor(autorId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comunidadService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<ComunidadInfo>) {
    return this.comunidadService.update(id, data);
  }

  @Put(':id/like')
  toggleLike(@Param('id') id: string, @Body('userId') userId: string) {
    return this.comunidadService.toggleLike(id, userId);
  }

  @Post(':id/comentarios')
  addComentario(
    @Param('id') id: string,
    @Body() comentario: Partial<Comentario>,
  ) {
    return this.comunidadService.addComentario(id, comentario);
  }

  @Delete(':id')
  deactivate(@Param('id') id: string) {
    return this.comunidadService.deactivate(id);
  }
}
