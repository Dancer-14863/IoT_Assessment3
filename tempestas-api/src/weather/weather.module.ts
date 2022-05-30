import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherData } from './entities/weather-data.entity';
import { Node2Module } from 'src/node2/node2.module';

@Module({
  imports: [TypeOrmModule.forFeature([WeatherData]), Node2Module],
  controllers: [WeatherController],
  providers: [WeatherService],
  exports: [WeatherService],
})
export class WeatherModule {}
