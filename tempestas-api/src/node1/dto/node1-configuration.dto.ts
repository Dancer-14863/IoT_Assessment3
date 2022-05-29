import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class Node1ConfigurationDTO {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(100)
  min_threshold: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(100)
  max_threshold: number;
}
