import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { DatabaseService } from './app.service.js';


@Module({
  imports: [],
  controllers: [AppController],
  providers: [DatabaseService],
})
export class AppModule {}
