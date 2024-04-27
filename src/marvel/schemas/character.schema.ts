import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CharacterDocument = HydratedDocument<Character>;

@Schema()
export class Character {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  thumbnail: string;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);