import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'node1_configuration' })
export class Node1Configuration {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'min_threshold', default: 25 })
  public min_threshold: number;

  @Column({ name: 'max_threshold', default: 75 })
  public max_threshold: number;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;
}
