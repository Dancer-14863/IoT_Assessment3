import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';

@Entity({ name: 'weather_data' })
export class WeatherData {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'weather_code' })
  public weather_code: number;

  @Column({ name: 'weather_text' })
  public weather_text: string;

  @Column({ name: 'rain_volume', type: 'float' })
  public rain_volume: number;

  @Column({ name: 'temperature', type: 'float' })
  public temperature: number;

  @Column({ name: 'datetime' })
  public datetime: Date;
}
