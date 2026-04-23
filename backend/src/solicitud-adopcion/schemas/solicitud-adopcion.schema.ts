import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SolicitudAdopcionDocument = SolicitudAdopcion & Document;

@Schema({ collection: 'solicitud_adopcion', timestamps: true })
export class SolicitudAdopcion {
  @Prop({ required: true })
  id_mascota: string;

  @Prop({ required: true })
  id_solicitante: string;

  @Prop({ required: true })
  id_dueno: string;

  @Prop({
    default: 'pendiente',
    enum: ['pendiente', 'en_revision', 'aprobada', 'rechazada', 'completada'],
  })
  estado: string;

  @Prop()
  motivo: string;

  @Prop()
  vivienda: string;

  @Prop({ default: false })
  tiene_mascotas: boolean;

  @Prop()
  fecha_solicitud: Date;

  @Prop()
  fecha_respuesta: Date;
}

export const SolicitudAdopcionSchema =
  SchemaFactory.createForClass(SolicitudAdopcion);
