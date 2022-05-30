import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Node1Configuration } from './node1/entities/node1-configuration.entity';
import { Node1SensorLog } from './node1/entities/node1-sensor-log.entity';
import { Node1Module } from './node1/node1.module';
import { WeatherData } from './weather/entities/weather-data.entity';
import { WeatherModule } from './weather/weather.module';
import { Node2Module } from './node2/node2.module';
import { Node2CoverLog } from './node2/entities/node2-cover-log.entity';
import { Node2HeightLog } from './node2/entities/node2-height-log.entity';
import { Node3Configuration } from './node3/entities/node3-configuration.entity';
import { Node3WaterPumpLog } from './node3/entities/node3-water-pump-log.entity';
import { Node3Module } from './node3/node3.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_URL'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        port: configService.get<number>('DB_PORT'),
        entities: [
          Node1Configuration,
          Node1SensorLog,
          WeatherData,
          Node2CoverLog,
          Node2HeightLog,
          Node3Configuration,
          Node3WaterPumpLog,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    Node1Module,
    WeatherModule,
    Node2Module,
    Node3Module,
    ScheduleModule.forRoot()
  ],
  providers: [
    {
      provide: 'MQTT_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.MQTT,
          options: {
            url: configService.get<any>('MQTT_BROKER'),
            port: configService.get<any>('MQTT_PORT'),
            username: configService.get<any>('MQTT_USERNAME'),
            password: configService.get<any>('MQTT_PASSWORD'),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
