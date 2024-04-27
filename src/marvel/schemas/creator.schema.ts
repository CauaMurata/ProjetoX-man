import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CreatorDocument = HydratedDocument<Creator>;

@Schema()
export class Creator {
  @Prop()
  name: string;

  @Prop()
  role: string;
}

export const CreatorSchema = SchemaFactory.createForClass(Creator);