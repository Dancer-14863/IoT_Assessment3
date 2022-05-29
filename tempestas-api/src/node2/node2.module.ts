import { Module } from '@nestjs/common';
import { Node2Service } from './node2.service';
import { Node2Controller } from './node2.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Node2CoverLog } from './entities/node2-cover-log.entity';
import { Node2HeightLog } from './entities/node2-height-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Node2CoverLog, Node2HeightLog])],
  controllers: [Node2Controller],
  providers: [Node2Service],
})
export class Node2Module {}
