import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class Node3ConfigurationDTO {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(15)
  public litre_per_min: number;
}
