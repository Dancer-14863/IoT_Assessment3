import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { MqttClient } from '@nestjs/microservices/external/mqtt-client.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Node1ConfigurationDTO } from './dto/node1-configuration.dto';
import { Node1SensorLogDTO } from './dto/node1-sensor-log.dto';
import { Node1Configuration } from './entities/node1-configuration.entity';
import { Node1SensorLog } from './entities/node1-sensor-log.entity';
import * as moment from 'moment';

@Injectable()
export class Node1Service implements OnModuleInit {
  private client: MqttClient;
  constructor(
    @InjectRepository(Node1Configuration)
    private readonly node1ConfigurationRepository: Repository<Node1Configuration>,
    @InjectRepository(Node1SensorLog)
    private readonly node1SensorLogRepository: Repository<Node1SensorLog>,
    private moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    this.client = this.moduleRef.get('MQTT_SERVICE', { strict: false });
  }

  saveNode1Configuration(configuration: Node1ConfigurationDTO) {
    return this.node1ConfigurationRepository.save(configuration);
  }

  async fetchConfiguration() {
    const count = await this.node1ConfigurationRepository.count();
    if (count === 0) throw new NotFoundException();
    return await this.node1ConfigurationRepository.findOne({
      order: { id: 'DESC' },
    });
  }

  saveSoilMoistureLog(soilMoistureLog: Node1SensorLogDTO) {
    return this.node1SensorLogRepository.save(soilMoistureLog);
  }

  async fetchSoilMoistureLogs() {
    return await this.node1SensorLogRepository.find();
  }

  async fetchAverageSoilMoisture() {
    const logs: Node1SensorLog[] = await this.node1SensorLogRepository.find({
      where: {
        recorded_at: Between(
          moment(new Date()).format('YYYY-MM-DD 00:00'),
          moment(new Date()).format('YYYY-MM-DD 23:59'),
        ),
      },
    });
    return {
      average: +(
        logs.reduce((sum, { sensor_reading }) => sum + sensor_reading, 0) /
        logs.length
      ).toFixed(2),
    };
  }
}
