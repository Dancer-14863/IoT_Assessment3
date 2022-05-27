import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherData } from './entities/weather-data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WeatherData])],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
