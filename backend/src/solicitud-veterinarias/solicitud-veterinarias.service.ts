import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SolicitudVeterinaria,
  SolicitudVeterinariaDocument,
} from './schemas/solicitud-veterinaria.schema.js';

@Injectable()
export class SolicitudVeterinariasService {
  constructor(
    @InjectModel(SolicitudVeterinaria.name)
    private solicitudModel: Model<SolicitudVeterinariaDocument>,
  ) {}

  async create(
    data: Partial<SolicitudVeterinaria>,
  ): Promise<SolicitudVeterinaria> {
    const created = new this.solicitudModel(data);
    return created.save();
  }

  async findAll(estado?: string): Promise<SolicitudVeterinaria[]> {
    const filter = estado ? { estado } : {};
    return this.solicitudModel.find(filter).exec();
  }

  async findOne(id: string): Promise<SolicitudVeterinaria | null> {
    return this.solicitudModel.findById(id).exec();
  }

  async findByUsuario(idUsuario: string): Promise<SolicitudVeterinaria[]> {
    return this.solicitudModel.find({ id_usuario: idUsuario }).exec();
  }

  async findByVeterinaria(
    idVeterinaria: string,
  ): Promise<SolicitudVeterinaria[]> {
    return this.solicitudModel
      .find({ id_veterinaria: idVeterinaria })
      .exec();
  }

  async updateEstado(
    id: string,
    estado: string,
  ): Promise<SolicitudVeterinaria | null> {
    return this.solicitudModel
      .findByIdAndUpdate(id, { estado }, { new: true })
      .exec();
  }
}
