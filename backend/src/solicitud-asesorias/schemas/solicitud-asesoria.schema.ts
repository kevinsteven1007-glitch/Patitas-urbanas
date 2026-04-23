import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SolicitudAsesoriaDocument = SolicitudAsesoria & Document;

@Schema({ collection: 'solicitud_asesorias', timestamps: true })
export class SolicitudAsesoria {
  @Prop({ required: true })
  id_usuario: string;

  @Prop()
  id_experto: string;

  @Prop({ required: true })
  tema: string;

  @Prop()
  descripcion: string;

  @Prop({
    default: 'pendiente',
    enum: ['pendiente', 'asignada', 'respondida', 'cerrada'],
  })
  estado: string;

  @Prop()
  respuesta: string;

  @Prop()
  fecha_solicitud: Date;

  @Prop()
  fecha_respuesta: Date;
}

export const SolicitudAsesoriaSchema =
  SchemaFactory.createForClass(SolicitudAsesoria);
