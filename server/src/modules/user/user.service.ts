import * as crypto from 'crypto';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';

import { User } from './user.entity';
import { StreamService } from '../stream/stream.service';
import { CreateStreamDto } from '../stream/dto/create-stream.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly streamService: StreamService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async findOneByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ username });
  }

  async create(payload: CreateUserDto): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('users')
      .where('users.email = :email', { email: payload.email })
      .orWhere('users.username = :username', { username: payload.username })
      .getOne();

    if (user) {
      throw new NotAcceptableException(
        'User with provided email already created. Username and email must be unique.',
      );
    }

    const newUser = await this.userRepository.save(
      this.userRepository.create(payload),
    );

    await this.streamService.create({
      title: 'My first stream',
      slug: payload.username,
      user: newUser,
    });

    return newUser;
  }

  async update(id: number, payload: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(id);
    delete user.password;

    let updatedUser = Object.assign(user, payload);
    return await this.userRepository.save(updatedUser);
  }
}
