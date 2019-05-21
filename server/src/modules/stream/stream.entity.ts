import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Tag } from '../tag/tag.entity';
import { User } from '../user/user.entity';

@Entity({ name: 'stream' })
export class Stream {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: '' })
  description: string;

  @Column()
  slug: string;

  @Column({ default: false })
  active: boolean;

  @Column({ default: false })
  public: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated = new Date();
  }

  @ManyToMany(type => Tag)
  @JoinTable()
  tags: Tag[];

  @OneToOne(type => User, user => user.stream)
  @JoinColumn()
  user: User;
}
