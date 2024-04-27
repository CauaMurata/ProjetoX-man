import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comic } from '../schemas/comic.schema';
import { CreateComicDto } from './comicDTO/create-comic.dto';

@Injectable()
export class ComicService {
    constructor(@InjectModel(Comic.name) private readonly comicModel: Model<any>) { }

    async createComic(comicDto: CreateComicDto): Promise<any> {
        const createdComic = new this.comicModel(comicDto);
        return createdComic.save();
    }
}