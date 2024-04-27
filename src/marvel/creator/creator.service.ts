import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Creator } from '../schemas/creator.schema';
import { CreateCreatorDto } from './creatorDTO/create-creator.dto';

@Injectable()
export class CreatorService {
    constructor(@InjectModel(Creator.name) private readonly creatorModel: Model<Creator>) { }

    async createCreator(creatorDto: CreateCreatorDto): Promise<any> {
        const createdCreator = new this.creatorModel(creatorDto);
        return createdCreator.save();
    }
}