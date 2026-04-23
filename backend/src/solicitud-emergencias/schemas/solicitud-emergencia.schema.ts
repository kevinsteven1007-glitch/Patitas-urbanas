import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SolicitudEmergenciaDocument = SolicitudEmergencia & Document;

@Schema({ collection: 'solicitud_emergencias', timestamps: true })
export class SolicitudEmergencia {
  @Prop({ required: true })
  id_usuario: string;

  @Prop({ required: true })
  tipo_emergencia: string;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ type: Object })
  ubicacion: {
    lat: number;
    lng: number;
  };

  @Prop()
  foto_url: string;

  @Prop({
    default: 'reportada',
    enum: ['reportada', 'en_atencion', 'resuelta'],
  })
  estado: string;

  @Prop()
  id_respondedor: string;

  @Prop()
  fecha_reporte: Date;

  @Prop()
  fecha_resolucion: Date;
}

export const SolicitudEmergenciaSchema = SchemaFactory.createForClass(
  SolicitudEmergencia,
);
