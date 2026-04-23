import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mascota, MascotaDocument } from './schemas/mascota.schema.js';

@Injectable()
export class MascotasService {
  constructor(
    @InjectModel(Mascota.name) private mascotaModel: Model<MascotaDocument>,
  ) {}

  async create(createMascotaDto: Partial<Mascota>): Promise<Mascota> {
    const createdMascota = new this.mascotaModel(createMascotaDto);
    return createdMascota.save();
  }

  async findAll(ubicacion?: string, estado?: string): Promise<Mascota[]> {
    const filter: any = {};
    if (ubicacion) filter.ubicacion = ubicacion;
    if (estado) filter.estado = estado;
    return this.mascotaModel.find(filter).exec();
  }

  async findOne(id: string): Promise<Mascota | null> {
    return this.mascotaModel.findById(id).exec();
  }

  async update(
    id: string,
    updateMascotaDto: Partial<Mascota>,
  ): Promise<Mascota | null> {
    return this.mascotaModel
      .findByIdAndUpdate(id, updateMascotaDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Mascota | null> {
    return this.mascotaModel.findByIdAndDelete(id).exec();
  }
}
