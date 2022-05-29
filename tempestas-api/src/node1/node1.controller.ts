import { Controller, Get } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { Node1ConfigurationDTO } from './dto/node1-configuration.dto';
import { Node1SensorLogDTO } from './dto/node1-sensor-log.dto';
import { Node1Service } from './node1.service';

@Controller('node1')
export class Node1Controller {
  constructor(private readonly node1Service: Node1Service) {}

  @MessagePattern('node1/notifications/logs')
  getLogsFromNotifications(@Payload() data: Node1SensorLogDTO, @Ctx() context: MqttContext) {
    return this.node1Service.saveNode1SensorLog(data);
  }

  @MessagePattern('node1/update-configuration')
  getConfigurationChange(
    @Payload() data: Node1ConfigurationDTO,
    @Ctx() context: MqttContext,
  ) {
    return this.node1Service.saveNode1Configuration(data);
  }

  @Get('configuration')
  getConfiguration() {
    return this.node1Service.fetchConfiguration();
  }

  @Get('sensor-logs')
  getSensorLogs() {
    return this.node1Service.fetchSensorLogs();
  }
}
