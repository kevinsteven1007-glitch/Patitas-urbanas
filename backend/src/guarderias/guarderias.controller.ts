import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { GuarderiasService } from './guarderias.service.js';
import { Guarderia, GuarderiaComentario } from './schemas/guarderia.schema.js';

@Controller('guarderias')
export class GuarderiasController {
  constructor(private readonly guarderiasService: GuarderiasService) {}

  @Post()
  create(@Body() data: Partial<Guarderia>) {
    return this.guarderiasService.create(data);
  }

  @Get()
  findAll() {
    return this.guarderiasService.findAll();
  }

  @Get('autor/:autorId')
  findByAutor(@Param('autorId') autorId: string) {
    return this.guarderiasService.findByAutor(autorId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guarderiasService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Guarderia>) {
    return this.guarderiasService.update(id, data);
  }

  @Put(':id/like')
  toggleLike(@Param('id') id: string, @Body('userId') userId: string) {
    return this.guarderiasService.toggleLike(id, userId);
  }

  @Delete(':id')
  deactivate(@Param('id') id: string) {
    return this.guarderiasService.deactivate(id);
  }

  @Get(':id/comentarios')
  getComentarios(@Param('id') id: string) {
    return this.guarderiasService.getComentarios(id);
  }

  @Post(':id/comentarios')
  addComentario(
    @Param('id') id: string,
    @Body() comentario: Partial<GuarderiaComentario>,
  ) {
    return this.guarderiasService.addComentario(id, comentario);
  }
}
