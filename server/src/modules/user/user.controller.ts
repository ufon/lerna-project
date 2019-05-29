import {
  Controller,
  Body,
  Get,
  Post,
  Res,
  Req,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './../user';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
}
