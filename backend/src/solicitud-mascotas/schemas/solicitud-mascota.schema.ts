import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SolicitudMascotaDocument = SolicitudMascota & Document;

@Schema({ collection: 'solicitud_mascotas', timestamps: true })
export class SolicitudMascota {
  @Prop({ required: true })
  id_usuario: string;

  @Prop({
    required: true,
    enum: ['busqueda', 'reporte_perdida', 'reporte_hallazgo'],
  })
  tipo_solicitud: string;

  @Prop()
  descripcion: string;

  @Prop()
  especie_buscada: string;

  @Prop({
    default: 'activa',
    enum: ['activa', 'resuelta', 'cancelada'],
  })
  estado: string;

  @Prop()
  fecha_solicitud: Date;
}

export const SolicitudMascotaSchema =
  SchemaFactory.createForClass(SolicitudMascota);
