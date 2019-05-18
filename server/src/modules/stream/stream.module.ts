import { Module } from '@nestjs/common';
import { Stream } from './stream.entity';
import { StreamService } from './stream.service';
import { StreamController } from './stream.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Stream])],
  providers: [StreamService],
  controllers: [StreamController],
  exports: [StreamService],
})
export class StreamModule {}
