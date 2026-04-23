import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsuarioDocument = Usuario & Document;

@Schema({ collection: 'usuarios', timestamps: true })
export class Usuario {
  @Prop({ required: true, unique: true })
  uid: string;

  @Prop({ required: true })
  usuario: string;

  @Prop({ required: true })
  email: string;

  @Prop({ default: () => new Date() })
  fechaRegistro: Date;

  @Prop({ default: true })
  activo: boolean;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
