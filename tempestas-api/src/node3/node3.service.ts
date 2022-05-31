import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { MqttClient } from 'mqtt';
import { Between, Repository } from 'typeorm';
import { Node3ConfigurationDTO } from './dto/node3-configuration.dto';
import { Node3WaterPumpLogDTO } from './dto/node3-water-pump-log.dto';
import { Node3Configuration } from './entities/node3-configuration.entity';
import { Node3WaterPumpLog } from './entities/node3-water-pump-log.entity';
import { startOfDay, endOfDay, startOfWeek, endOfWeek } from 'date-fns';

@Injectable()
export class Node3Service implements OnModuleInit {
  private client: MqttClient;
  constructor(
    @InjectRepository(Node3Configuration)
    private readonly node3ConfigurationRepository: Repository<Node3Configuration>,
    @InjectRepository(Node3WaterPumpLog)
    private readonly node3WaterPumpLogRepository: Repository<Node3WaterPumpLog>,
    private moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    this.client = this.moduleRef.get('MQTT_SERVICE', { strict: false });
  }

  saveNode3Configuration(configuration: Node3ConfigurationDTO) {
    return this.node3ConfigurationRepository.save(configuration);
  }

  async fetchConfiguration() {
    const count = await this.node3ConfigurationRepository.count();
    if (count === 0) throw new NotFoundException();
    return await this.node3ConfigurationRepository.findOne({
      order: { id: 'DESC' },
    });
  }

  saveNode3WaterPumpLog(waterPumpLog: Node3WaterPumpLogDTO) {
    return this.node3WaterPumpLogRepository.save(waterPumpLog);
  }

  async fetchWaterPumpLogs() {
    return await this.node3WaterPumpLogRepository.find();
  }

  async fetchWaterPumpLogsOfWeek() {
    return await this.node3WaterPumpLogRepository.find({
      where: {
        recorded_at: Between(startOfWeek(new Date()), endOfWeek(new Date())),
      },
    });
  }

  async fetchWaterPumpLogsTotal() {
    const logs: Node3WaterPumpLog[] =
      await this.node3WaterPumpLogRepository.find({
        where: {
          recorded_at: Between(
            startOfDay(new Date()).toISOString(),
            endOfDay(new Date()).toISOString(),
          ),
        },
      });
    return {
      total: +logs
        .reduce((sum, { pumped_litres }) => sum + pumped_litres, 0)
        .toFixed(2),
    };
  }
}
