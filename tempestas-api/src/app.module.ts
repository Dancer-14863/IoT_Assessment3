import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Node1Configuration } from './node1/entities/node1-configuration.entity';
import { Node1SensorLog } from './node1/entities/node1-sensor-log.entity';
import { Node1Module } from './node1/node1.module';
import { WeatherData } from './weather/entities/weather-data.entity';
import { WeatherModule } from './weather/weather.module';

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
        entities: [Node1Configuration, Node1SensorLog, WeatherData],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    Node1Module,
    WeatherModule,
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
