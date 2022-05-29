import { Test, TestingModule } from '@nestjs/testing';
import { Node3Service } from './node3.service';

describe('Node3Service', () => {
  let service: Node3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Node3Service],
    }).compile();

    service = module.get<Node3Service>(Node3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
