import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario, UsuarioDocument } from './schemas/usuario.schema.js';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name)
    private usuarioModel: Model<UsuarioDocument>,
  ) {}

  async create(data: Partial<Usuario>): Promise<Usuario> {
    const created = new this.usuarioModel(data);
    return created.save();
  }

  async findByUid(uid: string): Promise<Usuario | null> {
    return this.usuarioModel.findOne({ uid }).select('-email').exec();
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioModel.findOne({ email }).exec();
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioModel
      .find({ activo: { $ne: false } })
      .sort({ fechaRegistro: -1 })
      .exec();
  }

  async update(
    uid: string,
    data: Partial<Usuario>,
  ): Promise<Usuario | null> {
    return this.usuarioModel
      .findOneAndUpdate({ uid }, data, { new: true })
      .exec();
  }

  async deactivate(uid: string): Promise<Usuario | null> {
    return this.usuarioModel
      .findOneAndUpdate({ uid }, { activo: false }, { new: true })
      .exec();
  }
}
