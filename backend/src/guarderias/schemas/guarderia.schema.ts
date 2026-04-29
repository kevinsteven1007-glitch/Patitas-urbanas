import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// ── Sub-documento: Comentario/Reseña de una guardería ──
export type GuarderiaComentarioDocument = GuarderiaComentario & Document;

@Schema({ _id: true })
export class GuarderiaComentario {
  @Prop({ required: true })
  autorId: string;

  @Prop({ default: 'Anónimo' })
  autorAlias: string;

  @Prop({ default: 0, min: 0, max: 5 })
  calificacion: number;

  @Prop({ default: '' })
  titulo: string;

  @Prop({ required: true })
  texto: string;

  @Prop({ default: () => new Date() })
  fechaCreacion: Date;
}

export const GuarderiaComentarioSchema =
  SchemaFactory.createForClass(GuarderiaComentario);

// ── Documento principal: Guardería ──
export type GuarderiaDocument = Guarderia & Document;

@Schema({ collection: 'guarderias', timestamps: true })
export class Guarderia {
  @Prop({ required: true })
  nombre: string;

  @Prop({ default: '' })
  ubicacion: string;

  @Prop({ default: '' })
  direccion: string;

  @Prop({ default: '' })
  servicio: string;

  @Prop({ default: '' })
  calificacion: string;

  @Prop({ default: '' })
  tratoMascotas: string;

  @Prop({ default: '' })
  comentarios: string;

  @Prop({ required: true })
  autorId: string;

  @Prop({ default: 0 })
  likeCount: number;

  @Prop({ type: [String], default: [] })
  likedBy: string[];

  @Prop({ default: 0 })
  commentCount: number;

  @Prop({ type: [GuarderiaComentarioSchema], default: [] })
  comentariosReview: GuarderiaComentario[];

  @Prop({ default: true })
  activo: boolean;
}

export const GuarderiaSchema = SchemaFactory.createForClass(Guarderia);
