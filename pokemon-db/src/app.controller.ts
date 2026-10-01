import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { DatabaseService } from './app.service.js';


@Controller('get-pokemon')
export class AppController {

  constructor(private readonly databaseService: DatabaseService) {

  }

  @Get(':username')
  getPokemon(@Param('username') username: string): string {


    //check if user is in users table, if not, then add the user.
    const ret = this.databaseService.addUser(username);

    if (ret) {
      //search pokemon that belongs to user

    const pokemonArr = this.databaseService.getPokemon(username);
    return JSON.stringify(pokemonArr);


    }
    else {
      throw new BadRequestException('Invalid username provided'); 
    }











  }
}
