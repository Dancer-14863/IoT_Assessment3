import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { MqttClient } from 'mqtt';
import { Node2Service } from 'src/node2/node2.service';
import { Repository } from 'typeorm';
import { WeatherDataDTO } from './dto/weather-data.dto';
import { WeatherData } from './entities/weather-data.entity';

@Injectable()
export class WeatherService implements OnModuleInit {
  private client: MqttClient;
  constructor(
    @InjectRepository(WeatherData)
    private readonly weatherDataRepository: Repository<WeatherData>,
    @Inject(Node2Service)
    private readonly node2Service: Node2Service,
    private moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    this.client = this.moduleRef.get('MQTT_SERVICE', { strict: false });
  }

  saveWeatherLog(weatherLog: WeatherDataDTO) {
    return this.weatherDataRepository.save(weatherLog);
  }

  async processWeatherData(data: WeatherDataDTO) {
    const isHeavyRain: boolean = await this.isHeavyRain(data);
    if (isHeavyRain) {
      this.node2Service.changeToFullCover();
      this.sendNotification('Cover has been fully closed due to bad weather');
    }
  }

  async fetchLatestWeatherData() {
    return await this.weatherDataRepository.findOne({
      order: { id: 'DESC' },
    });
  }

  async fetchAllWeatherData() {
    return await this.weatherDataRepository.find();
  }

  sendNotification(message: string) {
    this.client.emit('api/notifications', { message: message });
  }

  async isHeavyRain(data?: WeatherDataDTO) {
    const heavyRainCodes = [
      200, 201, 202, 210, 211, 212, 221, 230, 231, 232, 314, 502, 503, 504, 511,
      522, 531,
    ];
    let weatherCode: number;
    if (data) {
      weatherCode = data.weather_code;
    } else {
      weatherCode = (await this.fetchLatestWeatherData()).weather_code;
    }
    return heavyRainCodes.includes(weatherCode);
  }

  async isLightRain(data?: WeatherDataDTO) {
    const lightRainCodes = [
      300, 301, 302, 310, 311, 312, 313, 321, 500, 501, 520, 521,
    ];
    let weatherCode: number;
    if (data) {
      weatherCode = data.weather_code;
    } else {
      weatherCode = (await this.fetchLatestWeatherData()).weather_code;
    }
    return lightRainCodes.includes(weatherCode);
  }
}
