import { Controller, Get } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { Node2CoverLogDTO } from './dto/node2-cover-log.dto';
import { Node2HeightLogDTO } from './dto/node2-height-log.dto';
import { Node2Service } from './node2.service';

@Controller('node2')
export class Node2Controller {
  constructor(private readonly node2Service: Node2Service) {}

  @MessagePattern('node2/notifications/cover')
  getCoverLogFromNotifications(
    @Payload() data: Node2CoverLogDTO,
    @Ctx() context: MqttContext,
  ) {
    return this.node2Service.saveCoverLog(data);
  }

  @MessagePattern('node2/notifications/height')
  getHeightLogFromNotifications(
    @Payload() data: Node2HeightLogDTO,
    @Ctx() context: MqttContext,
  ) {
    return this.node2Service.saveHeightLog(data);
  }

  @Get('cover-logs')
  getCoverLogs() {
    return this.node2Service.fetchCoverLogs();
  }

  @Get('height-logs')
  getHeightLogs() {
    return this.node2Service.fetchHeightLogs();
  }
}
