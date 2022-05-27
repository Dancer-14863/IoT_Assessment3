import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { MqttClient } from 'mqtt';
import { Repository } from 'typeorm';
import { WeatherData } from './entities/weather-data.entity';

@Injectable()
export class WeatherService {
  private client: MqttClient;
  constructor(
    @InjectRepository(WeatherData)
    private readonly weatherDataRepository: Repository<WeatherData>,
    private moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    this.client = this.moduleRef.get('MQTT_SERVICE', { strict: false });
  }

  async fetchLatestWeatherData() {
    return await this.weatherDataRepository.findOne({
      order: { id: 'DESC' },
    });
  }

  async fetchAllWeatherData() {
    return await this.weatherDataRepository.find();
  }
}
