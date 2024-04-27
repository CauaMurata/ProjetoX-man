import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character } from '../schemas/character.schema';
import { CreateCharacterDto } from './characterDTO/create-character.dto';

@Injectable()
export class CharacterService {
  constructor(@InjectModel(Character.name) private readonly characterModel: Model<any>) {}

  async createCharacter(characterDto: CreateCharacterDto): Promise<any> {
    const createdCharacter = new this.characterModel(characterDto);
    return createdCharacter.save();
  }
}
