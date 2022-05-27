import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class Node2HeightLogDTO {
  @IsNotEmpty()
  sensor_reading: number;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsDate()
  recorded_at: Date;
}
