import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MarvelModule } from './marvel/marvel.module';
import { MarvelApiService } from './marvel-api/marvel-api.service';


@Module({
  imports: [MongooseModule.forRoot('mongodb://0.0.0.0:27017/SagaMarvel'), MarvelModule],
  controllers: [],
  providers: [MarvelApiService],
})
export class AppModule {}
