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
import { MascotasService } from './mascotas.service.js';
import { Mascota } from './schemas/mascota.schema.js';

@Controller('mascotas')
export class MascotasController {
  constructor(private readonly mascotasService: MascotasService) {}

  @Post()
  create(@Body() createMascotaDto: Partial<Mascota>) {
    return this.mascotasService.create(createMascotaDto);
  }

  @Get()
  findAll(
    @Query('ubicacion') ubicacion?: string,
    @Query('estado') estado?: string,
  ) {
    return this.mascotasService.findAll(ubicacion, estado);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mascotasService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMascotaDto: Partial<Mascota>) {
    return this.mascotasService.update(id, updateMascotaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mascotasService.remove(id);
  }
}
