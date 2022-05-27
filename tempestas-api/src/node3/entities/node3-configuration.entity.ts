import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'node3_configuration' })
export class Node3Configuration {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'litre_per_min', default: 0 })
  public litre_per_min: number;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;
}
