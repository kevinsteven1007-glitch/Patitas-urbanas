import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ComunidadInfo,
  ComunidadInfoDocument,
  Comentario,
} from './schemas/comunidad-info.schema.js';

@Injectable()
export class ComunidadService {
  constructor(
    @InjectModel(ComunidadInfo.name)
    private comunidadModel: Model<ComunidadInfoDocument>,
  ) {}

  async create(data: Partial<ComunidadInfo>): Promise<ComunidadInfo> {
    const created = new this.comunidadModel(data);
    return created.save();
  }

  async findAll(limit = 20): Promise<ComunidadInfo[]> {
    return this.comunidadModel
      .find({ activo: { $ne: false } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }

  async findByTipo(tipo: string): Promise<ComunidadInfo[]> {
    return this.comunidadModel.find({ tipo, activo: { $ne: false } }).exec();
  }

  async findByAutor(idAutor: string): Promise<ComunidadInfo[]> {
    return this.comunidadModel
      .find({ id_autor: idAutor, activo: { $ne: false } })
      .exec();
  }

  async findOne(id: string): Promise<ComunidadInfo | null> {
    return this.comunidadModel.findById(id).exec();
  }

  async update(
    id: string,
    data: Partial<ComunidadInfo>,
  ): Promise<ComunidadInfo | null> {
    return this.comunidadModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }

  async addComentario(
    id: string,
    comentario: Partial<Comentario>,
  ): Promise<ComunidadInfo | null> {
    return this.comunidadModel
      .findByIdAndUpdate(
        id,
        { $push: { comentarios: comentario } },
        { new: true },
      )
      .exec();
  }

  async toggleLike(
    id: string,
    userId: string,
  ): Promise<ComunidadInfo | null> {
    const doc = await this.comunidadModel.findById(id).exec();
    if (!doc) return null;

    const index = doc.likedBy.indexOf(userId);
    if (index === -1) {
      // Agregar like
      doc.likedBy.push(userId);
      doc.likes = doc.likedBy.length;
    } else {
      // Quitar like
      doc.likedBy.splice(index, 1);
      doc.likes = doc.likedBy.length;
    }
    return doc.save();
  }

  async deactivate(id: string): Promise<ComunidadInfo | null> {
    return this.comunidadModel
      .findByIdAndUpdate(id, { activo: false }, { new: true })
      .exec();
  }
}
