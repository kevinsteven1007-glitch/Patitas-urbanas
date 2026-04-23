import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EntidadDocument = Entidad & Document;

@Schema({ collection: 'entidades', timestamps: true })
export class Entidad {
  @Prop({ required: true })
  nombre: string;

  @Prop({
    required: true,
    enum: ['usuario', 'veterinaria', 'fundacion', 'experto'],
  })
  tipo: string;

  @Prop({ required: true, unique: true })
  correo: string;

  @Prop()
  telefono: string;

  @Prop()
  direccion: string;

  @Prop({ type: Object })
  ubicacion: {
    lat: number;
    lng: number;
  };

  @Prop()
  foto_perfil: string;

  @Prop({ default: false })
  verificado: boolean;

  @Prop({ default: true })
  activo: boolean;

  @Prop()
  fecha_registro: Date;

  @Prop()
  descripcion: string;

  @Prop()
  horario_atencion: string;

  @Prop({ type: [String], default: [] })
  servicios: string[];
}

export const EntidadSchema = SchemaFactory.createForClass(Entidad);
