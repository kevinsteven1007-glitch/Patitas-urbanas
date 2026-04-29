import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SolicitudAdopcion,
  SolicitudAdopcionDocument,
} from './schemas/solicitud-adopcion.schema.js';

@Injectable()
export class SolicitudAdopcionService {
  constructor(
    @InjectModel(SolicitudAdopcion.name)
    private solicitudModel: Model<SolicitudAdopcionDocument>,
  ) {}

  async create(data: Partial<SolicitudAdopcion>): Promise<SolicitudAdopcion> {
    const created = new this.solicitudModel(data);
    return created.save();
  }

  async findAll(estado?: string): Promise<SolicitudAdopcion[]> {
    const filter = estado ? { estado } : {};
    return this.solicitudModel.find(filter).exec();
  }

  async findOne(id: string): Promise<SolicitudAdopcion | null> {
    return this.solicitudModel.findById(id).exec();
  }

  async findByMascota(idMascota: string): Promise<SolicitudAdopcion[]> {
    return this.solicitudModel.find({ id_mascota: idMascota }).exec();
  }

  async findBySolicitante(
    idSolicitante: string,
  ): Promise<SolicitudAdopcion[]> {
    return this.solicitudModel
      .find({ id_solicitante: idSolicitante })
      .exec();
  }

  async findByDueno(idDueno: string): Promise<SolicitudAdopcion[]> {
    return this.solicitudModel.find({ id_dueno: idDueno }).exec();
  }

  async updateEstado(
    id: string,
    estado: string,
  ): Promise<SolicitudAdopcion | null> {
    return this.solicitudModel
      .findByIdAndUpdate(
        id,
        { estado, fecha_respuesta: new Date() },
        { new: true },
      )
      .exec();
  }
}
