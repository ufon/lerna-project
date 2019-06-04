import {
  Get,
  Controller,
  UseGuards,
  Req,
  Res,
  Body,
  Post,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AppService } from './app.service';
import { UsersService } from './../user';
import { StreamService } from './../stream';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { UpdateStreamDto } from '../stream/dto/update-stream.dto';
@ApiBearerAuth()
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UsersService,
    private readonly streamService: StreamService,
  ) {}

  @Get()
  @UseGuards(AuthGuard())
  root(): string {
    return this.appService.root();
  }

  @Get('profile')
  @UseGuards(AuthGuard())
  async profile(@Req() request): Promise<any> {
    return this.userService.findOneByUsername(request.user.username);
  }

  @Post('profile')
  @UseGuards(AuthGuard())
  async updateProfile(
    @Req() request,
    @Body() payload: UpdateUserDto,
  ): Promise<any> {
    return this.userService.update(request.user.id, payload);
  }

  @Post('stream')
  @UseGuards(AuthGuard())
  async updateStream(
    @Req() request,
    @Body() payload: UpdateStreamDto,
  ): Promise<any> {
    return this.streamService.update(request.user.username, payload);
  }
}
