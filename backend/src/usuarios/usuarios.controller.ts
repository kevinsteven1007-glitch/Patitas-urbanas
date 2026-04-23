import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service.js';
import { Usuario } from './schemas/usuario.schema.js';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() data: Partial<Usuario>) {
    return this.usuariosService.create(data);
  }

  @Get(':uid')
  findByUid(@Param('uid') uid: string) {
    return this.usuariosService.findByUid(uid);
  }

  @Put(':uid')
  update(@Param('uid') uid: string, @Body() data: Partial<Usuario>) {
    return this.usuariosService.update(uid, data);
  }

  @Delete(':uid')
  deactivate(@Param('uid') uid: string) {
    return this.usuariosService.deactivate(uid);
  }
}
