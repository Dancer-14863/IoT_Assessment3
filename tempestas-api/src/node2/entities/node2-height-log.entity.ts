import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';

@Entity({ name: 'node2_height_log' })
export class Node2HeightLog {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'sensor_reading' })
  public sensor_reading: number;

  @Column({ name: 'status' })
  public status: string;

  @Column({ name: 'recorded_at' })
  public recorded_at: Date;
}
