import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ComicDocument = HydratedDocument<Comic>;

@Schema()
export class Comic {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  thumbnail: string;
}

export const ComicSchema = SchemaFactory.createForClass(Comic);