import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Guarderia,
  GuarderiaDocument,
  GuarderiaComentario,
} from './schemas/guarderia.schema.js';

@Injectable()
export class GuarderiasService {
  constructor(
    @InjectModel(Guarderia.name)
    private guarderiaModel: Model<GuarderiaDocument>,
  ) {}

  async create(data: Partial<Guarderia>): Promise<Guarderia> {
    const created = new this.guarderiaModel(data);
    return created.save();
  }

  async findAll(): Promise<Guarderia[]> {
    return this.guarderiaModel
      .find({ activo: { $ne: false } })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findByAutor(autorId: string): Promise<Guarderia[]> {
    return this.guarderiaModel
      .find({ autorId, activo: { $ne: false } })
      .exec();
  }

  async findOne(id: string): Promise<Guarderia | null> {
    return this.guarderiaModel.findById(id).exec();
  }

  async update(
    id: string,
    data: Partial<Guarderia>,
  ): Promise<Guarderia | null> {
    return this.guarderiaModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }

  async toggleLike(
    id: string,
    userId: string,
  ): Promise<Guarderia | null> {
    const doc = await this.guarderiaModel.findById(id).exec();
    if (!doc) return null;

    const index = doc.likedBy.indexOf(userId);
    if (index === -1) {
      // Agregar like
      doc.likedBy.push(userId);
      doc.likeCount = doc.likedBy.length;
    } else {
      // Quitar like
      doc.likedBy.splice(index, 1);
      doc.likeCount = doc.likedBy.length;
    }
    return doc.save();
  }

  async deactivate(id: string): Promise<Guarderia | null> {
    return this.guarderiaModel
      .findByIdAndUpdate(id, { activo: false }, { new: true })
      .exec();
  }

  async getComentarios(id: string): Promise<GuarderiaComentario[]> {
    const doc = await this.guarderiaModel.findById(id).exec();
    return doc?.comentariosReview ?? [];
  }

  async addComentario(
    id: string,
    comentario: Partial<GuarderiaComentario>,
  ): Promise<Guarderia | null> {
    return this.guarderiaModel
      .findByIdAndUpdate(
        id,
        {
          $push: { comentariosReview: comentario },
          $inc: { commentCount: 1 },
        },
        { new: true },
      )
      .exec();
  }
}
