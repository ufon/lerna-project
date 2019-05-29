import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateStreamDto } from './dto/create-stream.dto';

import { UpdateStreamDto } from './dto/update-stream.dto';

import { Stream } from './stream.entity';

@Injectable()
export class StreamService {
  constructor(
    @InjectRepository(Stream)
    private readonly streamRepository: Repository<Stream>,
  ) {}

  async findOneById(id: number): Promise<Stream> {
    return this.streamRepository.findOne(id);
  }

  async findAll(): Promise<Stream[]> {
    return await this.streamRepository.find();
  }

  async findOneBySlug(slug: string): Promise<Stream> {
    return this.streamRepository.findOne({
      where: { slug },
      relations: ['user'],
    });
  }

  async findOneByStreamKey(userStreamKey: string): Promise<Stream> {
    return this.streamRepository.findOne({
      relations: ['user'],
      where: { user: { stream_key: userStreamKey } },
    });
  }

  async create(payload: CreateStreamDto): Promise<Stream> {
    const stream = await this.streamRepository.findOne({ user: payload.user });

    if (stream) {
      throw new NotAcceptableException(
        'Stream for this user is already created.',
      );
    }

    return await this.streamRepository.save(
      this.streamRepository.create(payload),
    );
  }

  async update(id: number, payload: UpdateStreamDto): Promise<Stream> {
    const stream = await this.findOneById(id);

    const updatedStream = Object.assign(stream, payload);
    return await this.streamRepository.save(updatedStream);
  }
}
