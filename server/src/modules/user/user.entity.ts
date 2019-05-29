import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Generated,
} from 'typeorm';
import { PasswordTransformer } from './password.transformer';
import { Stream } from '../stream/stream.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  username: string;

  @Column({ length: 255 })
  email: string;

  @Column()
  @Generated('uuid')
  stream_key: string;

  @Column({
    name: 'password',
    length: 255,
    transformer: new PasswordTransformer(),
    select: false,
  })
  @Exclude()
  password: string;

  @OneToOne(type => Stream, stream => stream.user)
  @JoinColumn()
  stream: Stream;
}
