import { IsNotEmpty } from 'class-validator';

import { User } from '../../user/user.entity';
import { Tag } from '../../tag/tag.entity';

export class UpdateStreamDto {
  readonly title: string;

  readonly description: string;

  readonly active: boolean;

  readonly tags: Tag[];
}
