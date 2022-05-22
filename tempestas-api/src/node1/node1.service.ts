import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { MqttClient } from '@nestjs/microservices/external/mqtt-client.interface';

@Injectable()
export class Node1Service implements OnModuleInit {
  private client: MqttClient;
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.client = this.moduleRef.get('MQTT_SERVICE', { strict: false });
  }
}
