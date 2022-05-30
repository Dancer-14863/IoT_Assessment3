import { Controller, Get } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  Ctx,
  MqttContext,
} from '@nestjs/microservices';
import { Node1SensorLogDTO } from 'src/node1/dto/node1-sensor-log.dto';
import { WeatherDataDTO } from './dto/weather-data.dto';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @MessagePattern('weather/latest')
  async getLogsFromNotifications(
    @Payload() data: WeatherDataDTO,
    @Ctx() context: MqttContext,
  ) {
    await this.weatherService.processWeatherData(data);
  }

  @Get('latest')
  getLatestWeatherData() {
    return this.weatherService.fetchLatestWeatherData();
  }

  @Get()
  getAllWeatherData() {
    return this.weatherService.fetchAllWeatherData();
  }
}
