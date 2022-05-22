import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { Node1Service } from './node1.service';

@Controller()
export class Node1Controller {
  constructor(private readonly node1Service: Node1Service) {}

  @MessagePattern('node1/notifications')
  getNotifications(@Payload() data: number[], @Ctx() context: MqttContext) {
    console.log(data);
  }
}
