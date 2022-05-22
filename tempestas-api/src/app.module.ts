import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Node1Module } from './node1/node1.module';

@Module({
  imports: [ConfigModule.forRoot(), Node1Module],
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
