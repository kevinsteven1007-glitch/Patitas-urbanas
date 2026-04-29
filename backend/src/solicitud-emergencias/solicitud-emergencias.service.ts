import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SolicitudEmergencia,
  SolicitudEmergenciaDocument,
} from './schemas/solicitud-emergencia.schema.js';

@Injectable()
export class SolicitudEmergenciasService {
  constructor(
    @InjectModel(SolicitudEmergencia.name)
    private solicitudModel: Model<SolicitudEmergenciaDocument>,
  ) {}

  async create(
    data: Partial<SolicitudEmergencia>,
  ): Promise<SolicitudEmergencia> {
    const created = new this.solicitudModel(data);
    return created.save();
  }

  async findAll(): Promise<SolicitudEmergencia[]> {
    return this.solicitudModel.find().exec();
  }

  async findActivas(): Promise<SolicitudEmergencia[]> {
    return this.solicitudModel
      .find({ estado: { $ne: 'resuelta' } })
      .exec();
  }

  async findOne(id: string): Promise<SolicitudEmergencia | null> {
    return this.solicitudModel.findById(id).exec();
  }

  async findByUsuario(idUsuario: string): Promise<SolicitudEmergencia[]> {
    return this.solicitudModel.find({ id_usuario: idUsuario }).exec();
  }

  async asignarRespondedor(
    id: string,
    idRespondedor: string,
  ): Promise<SolicitudEmergencia | null> {
    return this.solicitudModel
      .findByIdAndUpdate(
        id,
        { id_respondedor: idRespondedor, estado: 'en_atencion' },
        { new: true },
      )
      .exec();
  }

  async marcarResuelta(id: string): Promise<SolicitudEmergencia | null> {
    return this.solicitudModel
      .findByIdAndUpdate(
        id,
        { estado: 'resuelta', fecha_resolucion: new Date() },
        { new: true },
      )
      .exec();
  }
}
