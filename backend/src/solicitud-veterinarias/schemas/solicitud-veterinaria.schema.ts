import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SolicitudVeterinariaDocument = SolicitudVeterinaria & Document;

@Schema({ collection: 'solicitud_veterinarias', timestamps: true })
export class SolicitudVeterinaria {
  @Prop({ required: true })
  id_usuario: string;

  @Prop({ required: true })
  id_veterinaria: string;

  @Prop()
  id_mascota: string;

  @Prop({ required: true })
  tipo_servicio: string;

  @Prop()
  descripcion: string;

  @Prop()
  fecha_cita: Date;

  @Prop({
    default: 'pendiente',
    enum: ['pendiente', 'confirmada', 'cancelada', 'completada'],
  })
  estado: string;

  @Prop()
  costo: number;

  @Prop()
  fecha_solicitud: Date;
}

export const SolicitudVeterinariaSchema = SchemaFactory.createForClass(
  SolicitudVeterinaria,
);
