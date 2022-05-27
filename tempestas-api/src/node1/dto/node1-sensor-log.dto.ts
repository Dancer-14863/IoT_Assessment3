import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class Node1SensorLogDTO {
  @IsNotEmpty()
  sensor_reading: number;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsDate()
  recorded_at: Date;
}
