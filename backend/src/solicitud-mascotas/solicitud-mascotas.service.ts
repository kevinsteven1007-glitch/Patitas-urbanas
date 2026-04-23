import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SolicitudMascota,
  SolicitudMascotaDocument,
} from './schemas/solicitud-mascota.schema.js';

@Injectable()
export class SolicitudMascotasService {
  constructor(
    @InjectModel(SolicitudMascota.name)
    private solicitudModel: Model<SolicitudMascotaDocument>,
  ) {}

  async create(data: Partial<SolicitudMascota>): Promise<SolicitudMascota> {
    const created = new this.solicitudModel(data);
    return created.save();
  }

  async findAll(estado?: string): Promise<SolicitudMascota[]> {
    const filter = estado ? { estado } : {};
    return this.solicitudModel.find(filter).exec();
  }

  async findOne(id: string): Promise<SolicitudMascota | null> {
    return this.solicitudModel.findById(id).exec();
  }

  async findByUsuario(idUsuario: string): Promise<SolicitudMascota[]> {
    return this.solicitudModel.find({ id_usuario: idUsuario }).exec();
  }

  async findByTipo(tipo: string): Promise<SolicitudMascota[]> {
    return this.solicitudModel.find({ tipo_solicitud: tipo }).exec();
  }

  async updateEstado(
    id: string,
    estado: string,
  ): Promise<SolicitudMascota | null> {
    return this.solicitudModel
      .findByIdAndUpdate(id, { estado }, { new: true })
      .exec();
  }
}
