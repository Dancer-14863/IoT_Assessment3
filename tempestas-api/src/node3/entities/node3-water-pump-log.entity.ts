import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';

@Entity({ name: 'node3_water_pump_log' })
export class Node3WaterPumpLog {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'pumped_litres', default: 0 })
  public pumped_litres: number;

  @Column({ name: 'pumped_duration', default: 0 })
  public pumped_duration: number;

  @Column({ name: 'recorded_at' })
  public recorded_at: Date;
}
