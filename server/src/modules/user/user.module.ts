import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './user.service';
import { StreamModule } from '../stream/stream.module';
import { StreamService } from '../stream/stream.service';
import { UsersController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), StreamModule],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService, StreamService],
})
export class UserModule {}
