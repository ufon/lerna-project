import {
  Controller,
  Body,
  Get,
  Post,
  Res,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { AuthService, LoginUserDto, RegisterUserDto } from './';
import { UsersService } from './../user';
import { Response, Request } from 'express';

@Controller('auth')
@ApiUseTags('authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('login')
  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() payload: LoginUserDto): Promise<any> {
    const user = await this.authService.validateUser(payload);
    return await this.authService.createToken(user);
  }

  @Post('register')
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async register(@Body() payload: RegisterUserDto): Promise<any> {
    const user = await this.userService.create(payload);

    return {
      email: user.email,
    };
  }

  @Get('check')
  async check(@Req() req: Request, @Res() res: Response) {
    console.log(req.query);

    const user = await this.userService.findOneByUsername('username');

    if (user && user.stream_key === 'key') {
      //logic to update stream status

      res.status(HttpStatus.CREATED).send();
    } else {
      res.status(HttpStatus.NOT_FOUND).send();
    }
  }
}
