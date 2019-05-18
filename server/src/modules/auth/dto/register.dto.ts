import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDto {
  @ApiModelProperty({
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiModelProperty({
    required: true,
  })
  @IsNotEmpty()
  firstname: string;

  @ApiModelProperty({
    required: true,
  })
  @IsNotEmpty()
  lastname: string;

  @ApiModelProperty({
    required: true,
  })
  @IsNotEmpty()
  username: string;

  @ApiModelProperty({
    required: true,
  })
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
