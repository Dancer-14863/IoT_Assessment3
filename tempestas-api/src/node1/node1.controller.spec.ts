import { Test, TestingModule } from '@nestjs/testing';
import { Node1Controller } from './node1.controller';
import { Node1Service } from './node1.service';

describe('Node1Controller', () => {
  let controller: Node1Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Node1Controller],
      providers: [Node1Service],
    }).compile();

    controller = module.get<Node1Controller>(Node1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
