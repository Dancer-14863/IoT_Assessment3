import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class Node2CoverLogDTO {
  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsDate()
  recorded_at: Date;
}
