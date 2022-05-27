import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class WeatherDataDTO {
  @IsNotEmpty()
  @IsString()
  weather_text: string;

  @IsNotEmpty()
  @IsNumber()
  rain_volume: number;

  @IsNotEmpty()
  @IsNumber()
  temperature: number;

  @IsNotEmpty()
  @IsDate()
  datetime: Date;
}
