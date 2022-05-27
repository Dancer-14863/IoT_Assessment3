import { Test, TestingModule } from '@nestjs/testing';
import { Node2Controller } from './node2.controller';
import { Node2Service } from './node2.service';

describe('Node2Controller', () => {
  let controller: Node2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Node2Controller],
      providers: [Node2Service],
    }).compile();

    controller = module.get<Node2Controller>(Node2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
