import { Controller, Get } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { Node3ConfigurationDTO } from './dto/node3-configuration.dto';
import { Node3WaterPumpLogDTO } from './dto/node3-water-pump-log.dto';
import { Node3Service } from './node3.service';

@Controller('node3')
export class Node3Controller {
  constructor(private readonly node3Service: Node3Service) {}

  @MessagePattern('node3/notifications/logs')
  getLogsFromNotifications(
    @Payload() data: Node3WaterPumpLogDTO,
    @Ctx() context: MqttContext,
  ) {
    return this.node3Service.saveNode3WaterPumpLog(data);
  }

  @MessagePattern('node3/update-configuration')
  getConfigurationChange(
    @Payload() data: Node3ConfigurationDTO,
    @Ctx() context: MqttContext,
  ) {
    return this.node3Service.saveNode3Configuration(data);
  }

  @Get('configuration')
  getConfiguration() {
    return this.node3Service.fetchConfiguration();
  }

  @Get('water-pump-logs')
  getWaterPumpLogs() {
    return this.node3Service.fetchWaterPumpLogs();
  }

  @Get('water-pump-logs/total/today')
  getWaterPumpLogsTotal() {
    return this.node3Service.fetchWaterPumpLogsTotal();
  }
}
