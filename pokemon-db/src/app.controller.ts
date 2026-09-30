import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './app.service.js';

import { DatabaseSync } from 'node:sqlite';


@Controller()
export class AppController {

  constructor(private readonly appService: DatabaseService) {

  }

  @Get()
  getHello(): string {




    return this.appService.getHello();
  }
}
