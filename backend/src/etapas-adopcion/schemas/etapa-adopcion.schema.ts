import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EtapaAdopcionDocument = EtapaAdopcion & Document;

@Schema({ collection: 'etapas_adopcion', timestamps: true })
export class EtapaAdopcion {
  @Prop({ required: true })
  id_solicitud: string;

  @Prop({ required: true })
  etapa: string;

  @Prop()
  descripcion: string;

  @Prop({ default: false })
  completada: boolean;

  @Prop({ required: true })
  orden: number;

  @Prop()
  fecha_actualizacion: Date;
}

export const EtapaAdopcionSchema =
  SchemaFactory.createForClass(EtapaAdopcion);
