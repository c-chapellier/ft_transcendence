import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  name: string;

  // @Column({ type: 'varchar', length: 300 })
  // avatar: string;

  @Column({ type: 'varchar', length: 300 })
  description: string;

  @Column({ type: 'boolean', default: true })
  isOnline: boolean;

  @Column({ type: 'boolean', default: false })
  isPlaying: boolean;

  @Column({ type: 'boolean', default: false })
  has2FactorAuth: boolean;

  @Column({ type: 'int', default: 0 })
  level: number;

  @Column({ type: 'int', default: 0 })
  nbrVictory: number;

  @Column({ type: 'int', default: 0 })
  nbrLoss: number;

  // @Column({ type: 'int', default: [] })
  // friends: UserEntity[];

  // @Column({ type: 'int', default: [] })
  // blockUsers: UserEntity[];

  // @Column({ type: 'int', default: [] })
  // matchHistory: Match[];

  // @Column({ type: 'int', default: [] })
  // achievements: Achievement[];
}