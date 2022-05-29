import { Module } from '@nestjs/common';
import { Node3Service } from './node3.service';
import { Node3Controller } from './node3.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Node3Configuration } from './entities/node3-configuration.entity';
import { Node3WaterPumpLog } from './entities/node3-water-pump-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Node3Configuration, Node3WaterPumpLog])],
  controllers: [Node3Controller],
  providers: [Node3Service],
})
export class Node3Module {}
