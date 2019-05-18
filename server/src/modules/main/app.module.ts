import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './../config';
import { AuthModule } from './../auth';
import { StreamModule } from './../stream';

@Module({
  imports: [TypeOrmModule.forRoot(), ConfigModule, AuthModule, StreamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
