import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SolicitudRecomendacion,
  SolicitudRecomendacionDocument,
} from './schemas/solicitud-recomendacion.schema.js';

@Injectable()
export class SolicitudRecomendacionService {
  constructor(
    @InjectModel(SolicitudRecomendacion.name)
    private recomendacionModel: Model<SolicitudRecomendacionDocument>,
  ) {}

  async create(
    data: Partial<SolicitudRecomendacion>,
  ): Promise<SolicitudRecomendacion> {
    const created = new this.recomendacionModel(data);
    return created.save();
  }

  async findAll(): Promise<SolicitudRecomendacion[]> {
    return this.recomendacionModel.find().exec();
  }

  async findOne(id: string): Promise<SolicitudRecomendacion | null> {
    return this.recomendacionModel.findById(id).exec();
  }

  async findByEntidad(
    idEntidad: string,
  ): Promise<SolicitudRecomendacion[]> {
    return this.recomendacionModel.find({ id_entidad: idEntidad }).exec();
  }

  async findByUsuario(
    idUsuario: string,
  ): Promise<SolicitudRecomendacion[]> {
    return this.recomendacionModel.find({ id_usuario: idUsuario }).exec();
  }

  async promedioCalificacion(idEntidad: string): Promise<number> {
    const result = await this.recomendacionModel
      .aggregate([
        { $match: { id_entidad: idEntidad } },
        { $group: { _id: null, promedio: { $avg: '$calificacion' } } },
      ])
      .exec();
    return result.length > 0 ? result[0].promedio : 0;
  }
}
