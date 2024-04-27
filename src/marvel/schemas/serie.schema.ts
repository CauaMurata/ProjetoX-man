import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SerieDocument = HydratedDocument<Serie>;

@Schema()
export class Serie {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  thumbnail: string;
}

export const SerieSchema = SchemaFactory.createForClass(Serie);