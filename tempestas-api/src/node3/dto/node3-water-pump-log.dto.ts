import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class Node3WaterPumpLogDTO {
  @IsNotEmpty()
  @IsNumber()
  public pumped_litres: number;

  @IsNotEmpty()
  @IsNumber()
  public pumped_duration: number;

  @IsNotEmpty()
  @IsDate()
  public recorded_at: Date;
}
