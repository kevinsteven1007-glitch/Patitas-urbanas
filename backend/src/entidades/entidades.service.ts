import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Entidad, EntidadDocument } from './schemas/entidad.schema.js';

@Injectable()
export class EntidadesService {
  constructor(
    @InjectModel(Entidad.name) private entidadModel: Model<EntidadDocument>,
  ) {}

  async create(data: Partial<Entidad>): Promise<Entidad> {
    const created = new this.entidadModel(data);
    return created.save();
  }

  async findAll(tipo?: string): Promise<Entidad[]> {
    const filter = tipo ? { tipo, activo: { $ne: false } } : { activo: { $ne: false } };
    return this.entidadModel.find(filter).exec();
  }

  async findOne(id: string): Promise<Entidad | null> {
    return this.entidadModel.findById(id).exec();
  }

  async findByCorreo(correo: string): Promise<Entidad | null> {
    return this.entidadModel.findOne({ correo }).exec();
  }

  async update(id: string, data: Partial<Entidad>): Promise<Entidad | null> {
    return this.entidadModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }

  async deactivate(id: string): Promise<Entidad | null> {
    return this.entidadModel
      .findByIdAndUpdate(id, { activo: false }, { new: true })
      .exec();
  }
}
