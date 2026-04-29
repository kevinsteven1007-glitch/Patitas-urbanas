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
import * as crypto from 'crypto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() data: Partial<Usuario>) {
    // Si no viene uid, generar uno aleatorio para proteger el correo
    if (!data.uid) {
      data.uid = crypto.randomUUID();
    }
    return this.usuariosService.create(data);
  }

  @Post('login')
  async login(@Body() body: { email: string }) {
    const user = await this.usuariosService.findByEmail(body.email);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user;
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
