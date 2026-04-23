import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SolicitudAsesoria,
  SolicitudAsesoriaDocument,
} from './schemas/solicitud-asesoria.schema.js';

@Injectable()
export class SolicitudAsesoriasService {
  constructor(
    @InjectModel(SolicitudAsesoria.name)
    private solicitudModel: Model<SolicitudAsesoriaDocument>,
  ) {}

  async create(data: Partial<SolicitudAsesoria>): Promise<SolicitudAsesoria> {
    const created = new this.solicitudModel(data);
    return created.save();
  }

  async findAll(estado?: string): Promise<SolicitudAsesoria[]> {
    const filter = estado ? { estado } : {};
    return this.solicitudModel.find(filter).exec();
  }

  async findOne(id: string): Promise<SolicitudAsesoria | null> {
    return this.solicitudModel.findById(id).exec();
  }

  async findByUsuario(idUsuario: string): Promise<SolicitudAsesoria[]> {
    return this.solicitudModel.find({ id_usuario: idUsuario }).exec();
  }

  async findByExperto(idExperto: string): Promise<SolicitudAsesoria[]> {
    return this.solicitudModel.find({ id_experto: idExperto }).exec();
  }

  async registrarRespuesta(
    id: string,
    respuesta: string,
  ): Promise<SolicitudAsesoria | null> {
    return this.solicitudModel
      .findByIdAndUpdate(
        id,
        { respuesta, estado: 'respondida', fecha_respuesta: new Date() },
        { new: true },
      )
      .exec();
  }

  async updateEstado(
    id: string,
    estado: string,
  ): Promise<SolicitudAsesoria | null> {
    return this.solicitudModel
      .findByIdAndUpdate(id, { estado }, { new: true })
      .exec();
  }
}
