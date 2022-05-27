import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Node1SensorLogDTO {
  @IsNotEmpty()
  @IsNumber()
  sensor_reading: number;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsDate()
  recorded_at: Date;
}
