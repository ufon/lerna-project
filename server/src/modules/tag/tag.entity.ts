import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
// import { CustomEmail } from './CustomEmail';

@Entity('tag')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tag: string;
}
