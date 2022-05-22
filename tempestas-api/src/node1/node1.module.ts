import { Module } from '@nestjs/common';
import { Node1Service } from './node1.service';
import { Node1Controller } from './node1.controller';

@Module({
  controllers: [Node1Controller],
  providers: [Node1Service],
})
export class Node1Module {}
