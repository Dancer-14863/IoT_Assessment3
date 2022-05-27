import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';

@Entity({ name: 'node1_sensor_log' })
export class Node1SensorLog {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'sensor_reading', default: 0 })
  public sensor_reading: number;

  @Column({ name: 'status', default: 'NORMAL' })
  public status: string;

  @Column({ name: 'recorded_at' })
  public recorded_at: Date;
}
