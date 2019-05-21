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
import { StreamService } from './../stream';
import { Response, Request } from 'express';
import { parseUrl } from 'query-string';

@Controller('auth')
@ApiUseTags('authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly streamService: StreamService,
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

  @Get('start')
  async start(@Req() req: Request, @Res() res: Response) {
    const { name: stream_key, tcurl } = req.query;

    const {
      query: { username },
    } = parseUrl(tcurl);

    const stream = await this.streamService.findOneBySlug(username.toString());

    const { user } = stream;

    if (user && user.stream_key === stream_key) {
      console.log('Translation was started!');
      await this.streamService.update(stream.id, { ...stream, active: true });
      res.status(HttpStatus.CREATED).send();
    } else {
      console.log('Validation error!');
      res.status(HttpStatus.NOT_FOUND).send();
    }
  }

  @Get('end')
  async end(@Req() req: Request, @Res() res: Response) {
    console.log(req.query);

    const { name: stream_key } = req.query;

    const stream = await this.streamService.findOneByStreamKey(stream_key);

    console.log(stream);

    if (stream && stream.active) {
      console.log('Translation was ended!');
      await this.streamService.update(stream.id, { ...stream, active: false });
    } else {
      console.log('Validation error!');
      res.status(HttpStatus.NOT_FOUND).send();
    }
  }
}
