import {
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { MqttClient } from '@nestjs/microservices/external/mqtt-client.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Node1ConfigurationDTO } from './dto/node1-configuration.dto';
import { Node1SensorLogDTO } from './dto/node1-sensor-log.dto';
import { Node1Configuration } from './entities/node1-configuration.entity';
import { Node1SensorLog } from './entities/node1-sensor-log.entity';
import { startOfDay, endOfDay } from 'date-fns';
import { Node3Configuration } from 'src/node3/entities/node3-configuration.entity';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Node3Service } from 'src/node3/node3.service';
import { WeatherService } from 'src/weather/weather.service';
import { Node2Service } from 'src/node2/node2.service';

@Injectable()
export class Node1Service implements OnModuleInit {
  private client: MqttClient;
  private isWaterPumpOn: boolean = false;
  constructor(
    @InjectRepository(Node1Configuration)
    private readonly node1ConfigurationRepository: Repository<Node1Configuration>,
    @InjectRepository(Node1SensorLog)
    private readonly node1SensorLogRepository: Repository<Node1SensorLog>,
    @Inject(Node2Service)
    private readonly node2Service: Node2Service,
    @Inject(Node3Service)
    private readonly node3Service: Node3Service,
    @Inject(WeatherService)
    private readonly weatherService: WeatherService,
    private schedulerRegistry: SchedulerRegistry,
    private moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    this.client = this.moduleRef.get('MQTT_SERVICE', { strict: false });
  }

  saveNode1Configuration(configuration: Node1ConfigurationDTO) {
    return this.node1ConfigurationRepository.save(configuration);
  }

  async processSoilMoisture(soilMoistureLog: Node1SensorLogDTO) {
    const isLightRain: boolean = await this.weatherService.isLightRain();
    const isHeavyRain: boolean = await this.weatherService.isHeavyRain();

    if (soilMoistureLog.status === 'BELOW THRESHOLD') {
      if (isLightRain) {
        this.node2Service.changeToNoCover();
        this.sendNotification(
          'Cover has been opened, to increase soil moisture during rain',
        );
      } else if (!this.isWaterPumpOn) {
        let litrePerMin;
        try {
          const configuration: Node3Configuration =
            await this.node3Service.fetchConfiguration();
          litrePerMin = configuration?.litre_per_min;
        } catch {
          litrePerMin = 1;
        }

        const timeWaterPumpOn = (1 / litrePerMin) * 60000;

        const callback = () => {
          this.isWaterPumpOn = false;
          this.schedulerRegistry.deleteTimeout('soil-moisture-timeout');
        };

        const timeout = setTimeout(callback, timeWaterPumpOn);
        this.schedulerRegistry.addTimeout('soil-moisture-timeout', timeout);
        this.isWaterPumpOn = true;
        this.client.emit('node3/water-pump-commands', { litres_to_pump: 1 });
        this.sendNotification(
          'Water pump has been turned on, due to low soil moisture',
        );
      }
    } else if (soilMoistureLog.status === 'ABOVE THRESHOLD') {
      if (isHeavyRain || isLightRain) {
        this.node2Service.changeToFullCover();
      } else {
        this.node2Service.changeToNoCover();
        this.sendNotification(
          'Cover has been opened, to get rid of excess soil moisture',
        );
      }
    } else {
      if (isHeavyRain) {
        this.node2Service.changeToFullCover();
      } else {
        this.node2Service.changeToPartialCover();
      }
    }
  }

  sendNotification(message: string) {
    this.client.emit('api/notifications', { message: message });
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
          startOfDay(new Date()).toISOString(),
          endOfDay(new Date()).toISOString(),
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
