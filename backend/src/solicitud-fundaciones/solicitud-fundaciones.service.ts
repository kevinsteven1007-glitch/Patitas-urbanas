import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SolicitudFundacion,
  SolicitudFundacionDocument,
} from './schemas/solicitud-fundacion.schema.js';

@Injectable()
export class SolicitudFundacionesService {
  constructor(
    @InjectModel(SolicitudFundacion.name)
    private solicitudModel: Model<SolicitudFundacionDocument>,
  ) {}

  async create(
    data: Partial<SolicitudFundacion>,
  ): Promise<SolicitudFundacion> {
    const created = new this.solicitudModel(data);
    return created.save();
  }

  async findAll(): Promise<SolicitudFundacion[]> {
    return this.solicitudModel.find().exec();
  }

  async findOne(id: string): Promise<SolicitudFundacion | null> {
    return this.solicitudModel.findById(id).exec();
  }

  async findByDonante(idDonante: string): Promise<SolicitudFundacion[]> {
    return this.solicitudModel.find({ id_donante: idDonante }).exec();
  }

  async findByFundacion(
    idFundacion: string,
  ): Promise<SolicitudFundacion[]> {
    return this.solicitudModel.find({ id_fundacion: idFundacion }).exec();
  }

  async findByTipo(tipo: string): Promise<SolicitudFundacion[]> {
    return this.solicitudModel.find({ tipo_donacion: tipo }).exec();
  }

  async updateEstado(
    id: string,
    estado: string,
  ): Promise<SolicitudFundacion | null> {
    return this.solicitudModel
      .findByIdAndUpdate(id, { estado }, { new: true })
      .exec();
  }
}
