import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MarvelApiService {
    private readonly baseUrl: string = 'http://gateway.marvel.com/v1/public';
    private readonly apiKey: string = '9aae56a86b37cdd2077c99db45b8f227';
    private readonly hash: string = '2fe5a7ec3a691892eb40fd88c7665046';

    async fetchSerie(): Promise<any> {
        const url = `${this.baseUrl}/series/2432?ts=1&apikey=${this.apiKey}&hash=${this.hash}`;

        try {
            const response = await axios.get(url);
            return response.data.data.results;
        } catch (error) {
            console.error('Error fetching series:', error.response.data);
            throw new Error('Failed to fetch series');
        }
    }

    async fetchDataByURL(resourceURI: string): Promise<any> {
        try {
            const response = await axios.get(`${resourceURI}?ts=1&apikey=${this.apiKey}&hash=${this.hash}`);
            return response.data.data.results;
        } catch (error) {
            console.error('Error fetching data:', error.response.data);
            throw new Error('Failed to fetch data');
        }
    }
}

