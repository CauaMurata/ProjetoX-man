import { Controller, Post } from '@nestjs/common';
import { MarvelService } from './marvel.service';

@Controller('marvel')
export class MarvelController {
  constructor(private readonly marvelService: MarvelService) {}

  @Post('data')
  async fetchDataAndSaveFromMarvelAPI() {
    try {
      const marvelData = await this.marvelService.fetchDataFromMarvelAPI();
      return { success: true, message: 'Data fetched and saved successfully', data: marvelData };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
      return { success: false, message: `Failed to fetch and save data: ${errorMessage}`, error: error.stack };
    }
  }
}

