import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSerieDto } from './serieDTO/create-serie.dto';
import { Serie } from '../schemas/serie.schema';

@Injectable()
export class SerieService {
    constructor(@InjectModel(Serie.name) private serieModel: Model<Serie>) { }

    async createSerie(serieDto: CreateSerieDto): Promise<Serie> {
        const createdSerie = new this.serieModel(serieDto);
        return createdSerie.save();
    }
}
