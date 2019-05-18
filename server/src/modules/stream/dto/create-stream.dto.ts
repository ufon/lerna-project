import { IsNotEmpty } from 'class-validator';

import { User } from '../../user/user.entity';

export class CreateStreamDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly slug: string;

  @IsNotEmpty()
  readonly user: User;
}
