import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SeccionApp,
  SeccionAppDocument,
} from './schemas/seccion-app.schema.js';

@Injectable()
export class SeccionesAppService {
  constructor(
    @InjectModel(SeccionApp.name)
    private seccionModel: Model<SeccionAppDocument>,
  ) {}

  async findAll(): Promise<SeccionApp[]> {
    return this.seccionModel.find().sort({ orden: 1 }).exec();
  }

  async findActivas(): Promise<SeccionApp[]> {
    return this.seccionModel.find({ activo: { $ne: false } }).sort({ orden: 1 }).exec();
  }

  async findByRol(rol: string): Promise<SeccionApp[]> {
    return this.seccionModel
      .find({ activo: { $ne: false }, roles_permitidos: rol })
      .sort({ orden: 1 })
      .exec();
  }

  async findOne(id: string): Promise<SeccionApp | null> {
    return this.seccionModel.findById(id).exec();
  }

  async update(
    id: string,
    data: Partial<SeccionApp>,
  ): Promise<SeccionApp | null> {
    return this.seccionModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }
}
