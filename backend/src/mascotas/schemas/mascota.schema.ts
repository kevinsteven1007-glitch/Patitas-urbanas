import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MascotaDocument = Mascota & Document;

@Schema({ collection: 'mascotas', timestamps: true })
export class Mascota {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  especie: string;

  @Prop({ required: true })
  raza: string;

  @Prop()
  edad_aproximada: number;

  @Prop()
  genero: string;

  @Prop()
  descripcion: string;

  @Prop()
  foto_url: string;

  @Prop({ required: true, index: true })
  ubicacion: string;

  @Prop({
    default: 'disponible',
    enum: ['disponible', 'en_proceso_adopcion', 'adoptado', 'perdido'],
  })
  estado: string;

  @Prop()
  id_usuario: string;

  @Prop({ type: [String], default: [] })
  vacunas: string[];

  @Prop({ default: false })
  esterilizado: boolean;

  @Prop()
  fecha_registro: Date;
}

export const MascotaSchema = SchemaFactory.createForClass(Mascota);
