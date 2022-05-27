import { Module } from '@nestjs/common';
import { Node1Service } from './node1.service';
import { Node1Controller } from './node1.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Node1Configuration } from './entities/node1-configuration.entity';
import { Node1SensorLog } from './entities/node1-sensor-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Node1Configuration, Node1SensorLog])],
  controllers: [Node1Controller],
  providers: [Node1Service],
})
export class Node1Module {}
