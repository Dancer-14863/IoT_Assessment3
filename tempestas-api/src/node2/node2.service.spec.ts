import { Test, TestingModule } from '@nestjs/testing';
import { Node2Service } from './node2.service';

describe('Node2Service', () => {
  let service: Node2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Node2Service],
    }).compile();

    service = module.get<Node2Service>(Node2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
