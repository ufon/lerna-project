import { Controller, Get, Param, Post, Body } from '@nestjs/common';

import { StreamService } from './stream.service';
import { Stream } from './stream.entity';
import { CreateStreamDto } from './dto/create-stream.dto';
import { UpdateStreamDto } from './dto/update-stream.dto';

@Controller('streams')
export class StreamController {
  constructor(private readonly streamService: StreamService) {}

  @Get()
  root(): Promise<Stream[]> {
    return this.streamService.findAll();
  }

  @Get(':id')
  findOneByID(
    @Param('id')
    id,
  ): Promise<Stream> {
    return this.streamService.findOneById(id);
  }

  @Get('/slug/:slug')
  findOneBySlug(
    @Param('slug')
    slug,
  ): Promise<Stream> {
    return this.streamService.findOneBySlug(slug.toString());
  }

  @Post()
  async create(@Body() createStreamDto: CreateStreamDto) {
    return this.streamService.create(createStreamDto);
  }

  @Post(':id')
  async update(
    @Param('id')
    id,
    @Body() updateStreamDto: UpdateStreamDto,
  ) {
    return this.streamService.update(id, updateStreamDto);
  }
}
