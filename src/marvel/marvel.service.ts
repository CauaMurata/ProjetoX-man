import { Injectable } from '@nestjs/common';
import { SerieService } from './serie/serie.service';
import { CreatorService } from './creator/creator.service';
import { ComicService } from './comic/comic.service';
import { CharacterService } from './character/character.service';
import { CreateSerieDto } from './serie/serieDTO/create-serie.dto';
import { CreateCreatorDto } from './creator/creatorDTO/create-creator.dto';
import { CreateComicDto } from './comic/comicDTO/create-comic.dto';
import { CreateCharacterDto } from './character/characterDTO/create-character.dto';
import { MarvelApiService } from 'src/marvel-api/marvel-api.service';

@Injectable()
export class MarvelService {
  constructor(
    private readonly serieService: SerieService,
    private readonly characterService: CharacterService,
    private readonly comicService: ComicService,
    private readonly creatorService: CreatorService,
    private readonly marvelApiService: MarvelApiService,
  ) { }

  async fetchDataFromMarvelAPI() {
    const marvelData = await this.marvelApiService.fetchSerie();
    await this.saveDataFromMarvelAPI(marvelData);
  }

  async saveDataFromMarvelAPI(marvelData: any) {
    if (!marvelData || !marvelData[0]) {
      throw new Error('Invalid data format from Marvel API');
    }

    const savedSeries = await this.createAndSaveSerie(marvelData[0]);
    const savedCharacters = await this.fetchAndSaveCharacters(marvelData[0].characters.collectionURI);
    const savedComics = await this.fetchAndSaveComics(marvelData[0].comics.collectionURI);
    const savedCreators = await this.createAndSaveCreators(marvelData[0].creators);

    return { savedSeries, savedCharacters, savedComics, savedCreators };
  }

  private async createAndSaveSerie(serieData: any): Promise<any> {
    const serieDto: CreateSerieDto = {
      title: serieData.title,
      description: serieData.description,
      thumbnail: `${serieData.thumbnail.path}.${serieData.thumbnail.extension}`,
    };
    return this.serieService.createSerie(serieDto);
  }

  private async fetchAndSaveCharacters(collectionUrl: string): Promise<any[]> {
    const charactersData = await this.marvelApiService.fetchDataByURL(collectionUrl);
    const savedCharacters = [];
    for (const characterData of charactersData) {
      const characterDto: CreateCharacterDto = {
        name: characterData.name,
        description: characterData.description || 'No description available',
        thumbnail: `${characterData.thumbnail.path}.${characterData.thumbnail.extension}`,
      };
      const savedCharacter = await this.characterService.createCharacter(characterDto);
      savedCharacters.push(savedCharacter);
    }
    return savedCharacters;
  }

  private async fetchAndSaveComics(collectionUrl: string): Promise<any[]> {
    const comicsData = await this.marvelApiService.fetchDataByURL(collectionUrl);
    const savedComics = [];
    for (const comicData of comicsData) {
      const comicDto: CreateComicDto = {
        title: comicData.title,
        description: comicData.description || 'No description available',
        thumbnail: `${comicData.thumbnail.path}.${comicData.thumbnail.extension}`,
      };
      const savedComic = await this.comicService.createComic(comicDto);
      savedComics.push(savedComic);
    }
    return savedComics;
  }

  private async createAndSaveCreators(creatorsData: { items: any[] }): Promise<any[]> {
    const savedCreators = [];
    for (const creatorData of creatorsData.items) {
      const creatorDto: CreateCreatorDto = {
        name: creatorData.name || 'Unknown Name',
        role: creatorData.role || 'Unknown Role',
      };
      const savedCreator = await this.creatorService.createCreator(creatorDto);
      savedCreators.push(savedCreator);
    }
    return savedCreators;
  }

}


