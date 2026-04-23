import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SeccionAppDocument = SeccionApp & Document;

@Schema({ collection: 'secciones_app', timestamps: true })
export class SeccionApp {
  @Prop({ required: true })
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop()
  icono: string;

  @Prop({ required: true })
  ruta: string;

  @Prop({ default: 0 })
  orden: number;

  @Prop({ default: true })
  activo: boolean;

  @Prop({ type: [String], default: [] })
  roles_permitidos: string[];
}

export const SeccionAppSchema = SchemaFactory.createForClass(SeccionApp);
