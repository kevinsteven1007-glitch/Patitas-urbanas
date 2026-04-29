import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SolicitudFundacionDocument = SolicitudFundacion & Document;

@Schema({ collection: 'solicitud_fundaciones', timestamps: true })
export class SolicitudFundacion {
  @Prop({ required: true })
  id_donante: string;

  @Prop({ required: true })
  id_fundacion: string;

  @Prop({
    required: true,
    enum: [
      'alimento',
      'juguetes',
      'dinero',
      'accesorios',
      'medicamentos',
      'otro',
    ],
  })
  tipo_donacion: string;

  @Prop()
  descripcion: string;

  @Prop()
  monto: number;

  @Prop({
    default: 'pendiente',
    enum: ['pendiente', 'confirmada', 'entregada'],
  })
  estado: string;

  @Prop()
  mensaje: string;

  @Prop()
  fecha_donacion: Date;
}

export const SolicitudFundacionSchema =
  SchemaFactory.createForClass(SolicitudFundacion);
