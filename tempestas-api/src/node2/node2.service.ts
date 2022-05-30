import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { MqttClient } from 'mqtt';
import { Repository } from 'typeorm';
import { Node2CoverLogDTO } from './dto/node2-cover-log.dto';
import { Node2HeightLogDTO } from './dto/node2-height-log.dto';
import { Node2CoverLog } from './entities/node2-cover-log.entity';
import { Node2HeightLog } from './entities/node2-height-log.entity';

@Injectable()
export class Node2Service implements OnModuleInit {
  private client: MqttClient;
  constructor(
    @InjectRepository(Node2HeightLog)
    private readonly node2HeightLogRepository: Repository<Node2HeightLog>,
    @InjectRepository(Node2CoverLog)
    private readonly node2CoverLogRepository: Repository<Node2CoverLog>,
    private moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    this.client = this.moduleRef.get('MQTT_SERVICE', { strict: false });
  }

  saveHeightLog(heightLog: Node2HeightLogDTO) {
    return this.node2HeightLogRepository.save(heightLog);
  }

  saveCoverLog(coverLog: Node2CoverLogDTO) {
    return this.node2CoverLogRepository.save(coverLog);
  }

  async fetchHeightLogs() {
    return await this.node2HeightLogRepository.find();
  }

  async fetchCoverLogs() {
    return await this.node2CoverLogRepository.find();
  }

  changeToNoCover() {
    this.client.emit('node2/cover-commands', {
      cover_command: 'NO_COVER',
    });
  }

  changeToFullCover() {
    this.client.emit('node2/cover-commands', {
      cover_command: 'FULL_COVER',
    });
  }

  changeToPartialCover() {
    this.client.emit('node2/cover-commands', {
      cover_command: 'PARTIAL_COVER',
    });
  }
}
