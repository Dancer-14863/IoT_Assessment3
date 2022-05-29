import { Test, TestingModule } from '@nestjs/testing';
import { Node3Controller } from './node3.controller';
import { Node3Service } from './node3.service';

describe('Node3Controller', () => {
  let controller: Node3Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Node3Controller],
      providers: [Node3Service],
    }).compile();

    controller = module.get<Node3Controller>(Node3Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
