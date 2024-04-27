import { Module } from '@nestjs/common';
import { MarvelService } from './marvel.service';
import { MarvelController } from './marvel.controller';
import { CharacterService } from './character/character.service';
import { ComicService } from './comic/comic.service';
import { SerieService } from './serie/serie.service';
import { CreatorService } from './creator/creator.service';
import { MarvelApiService } from 'src/marvel-api/marvel-api.service';
import { CharacterSchema } from './schemas/character.schema';
import { ComicSchema } from './schemas/comic.schema';
import { SerieSchema } from './schemas/serie.schema';
import { CreatorSchema } from './schemas/creator.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Character', schema: CharacterSchema },
      { name: 'Comic', schema: ComicSchema },
      { name: 'Serie', schema: SerieSchema },
      { name: 'Creator', schema: CreatorSchema },
    ]),
  ],
  controllers: [MarvelController],
  providers: [MarvelService, CharacterService, ComicService, SerieService, CreatorService, MarvelApiService],
})
export class MarvelModule {}
