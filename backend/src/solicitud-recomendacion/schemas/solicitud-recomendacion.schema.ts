import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SolicitudRecomendacionDocument = SolicitudRecomendacion & Document;

@Schema({ collection: 'solicitud_recomendacion', timestamps: true })
export class SolicitudRecomendacion {
  @Prop({ required: true })
  id_usuario: string;

  @Prop({ required: true })
  id_entidad: string;

  @Prop({ required: true, min: 1, max: 5 })
  calificacion: number;

  @Prop()
  comentario: string;

  @Prop()
  tipo_servicio: string;

  @Prop()
  fecha: Date;
}

export const SolicitudRecomendacionSchema = SchemaFactory.createForClass(
  SolicitudRecomendacion,
);
