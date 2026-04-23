import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ComentarioDocument = Comentario & Document;

@Schema({ _id: true })
export class Comentario {
  @Prop({ required: true })
  id_autor: string;

  @Prop({ default: 'Anónimo' })
  autorAlias: string;

  @Prop({ required: true })
  texto: string;

  @Prop({ default: () => new Date() })
  fecha: Date;
}

export const ComentarioSchema = SchemaFactory.createForClass(Comentario);

export type ComunidadInfoDocument = ComunidadInfo & Document;

@Schema({ collection: 'comunidad_info', timestamps: true })
export class ComunidadInfo {
  @Prop({ required: true })
  titulo: string;

  @Prop({ required: true })
  contenido: string;

  @Prop({ enum: ['informativo', 'pregunta', 'recomendacion', 'alerta'] })
  tipo: string;

  @Prop()
  imagen_url: string;

  @Prop({ required: true })
  id_autor: string;

  // ── Campos añadidos para compatibilidad con Android ──

  @Prop({ default: '' })
  alias: string;

  @Prop({ default: '' })
  categoria: string;

  @Prop({ default: '' })
  tipoMascota: string;

  @Prop({ default: '' })
  tipoReceta: string;

  @Prop({ default: '' })
  ingredientes: string;

  @Prop({ default: '' })
  preparacion: string;

  // ── Likes ──

  @Prop({ default: 0 })
  likes: number;

  @Prop({ type: [String], default: [] })
  likedBy: string[];

  // ── Comentarios, compartidos, guardados, reportes ──

  @Prop({ type: [ComentarioSchema], default: [] })
  comentarios: Comentario[];

  @Prop({ default: 0 })
  compartidos: number;

  @Prop({ type: [String], default: [] })
  guardados: string[];

  @Prop({ type: [Object], default: [] })
  reportes: { id_usuario: string; motivo: string; fecha: Date }[];

  @Prop({ default: true })
  activo: boolean;

  @Prop()
  fecha_publicacion: Date;
}

export const ComunidadInfoSchema =
  SchemaFactory.createForClass(ComunidadInfo);
