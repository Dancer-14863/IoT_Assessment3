import { Test, TestingModule } from '@nestjs/testing';
import { Node1Service } from './node1.service';

describe('Node1Service', () => {
  let service: Node1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Node1Service],
    }).compile();

    service = module.get<Node1Service>(Node1Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
