import { Controller, Get } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { WeatherDataDTO } from './dto/weather-data.dto';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('latest')
  getLatestWeatherData() {
    return this.weatherService.fetchLatestWeatherData();
  }
  
  @Get()
  getAllWeatherData() {
    return this.weatherService.fetchAllWeatherData();
  }
}
