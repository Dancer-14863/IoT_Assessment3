import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';

@Entity({ name: 'node2_cover_log' })
export class Node2CoverLog {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'state', default: 'NO_COVER' })
  public state: string;

  @Column({ name: 'recorded_at' })
  public recorded_at: Date;
}
