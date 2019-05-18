import { Get, Controller } from '@nestjs/common';

import { Tag } from './tag.entity';
import { TagService } from './tag.service';

import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('tags')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAll(): Promise<Tag[]> {
    return await this.tagService.findAll();
  }
}
