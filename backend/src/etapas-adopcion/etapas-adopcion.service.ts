import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  EtapaAdopcion,
  EtapaAdopcionDocument,
} from './schemas/etapa-adopcion.schema.js';

@Injectable()
export class EtapasAdopcionService {
  constructor(
    @InjectModel(EtapaAdopcion.name)
    private etapaModel: Model<EtapaAdopcionDocument>,
  ) {}

  async create(data: Partial<EtapaAdopcion>): Promise<EtapaAdopcion> {
    const created = new this.etapaModel(data);
    return created.save();
  }

  async findBySolicitud(idSolicitud: string): Promise<EtapaAdopcion[]> {
    return this.etapaModel
      .find({ id_solicitud: idSolicitud })
      .sort({ orden: 1 })
      .exec();
  }

  async findOne(id: string): Promise<EtapaAdopcion | null> {
    return this.etapaModel.findById(id).exec();
  }

  async marcarCompletada(id: string): Promise<EtapaAdopcion | null> {
    return this.etapaModel
      .findByIdAndUpdate(
        id,
        { completada: true, fecha_actualizacion: new Date() },
        { new: true },
      )
      .exec();
  }

  async update(
    id: string,
    data: Partial<EtapaAdopcion>,
  ): Promise<EtapaAdopcion | null> {
    return this.etapaModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }
}
