import { BadRequestException, Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DatabaseService } from './app.service.js';

export interface AddPokemonDto {
  username: string;
  speciesId: number;
  pokemonName: string;
  date: string;
}

export interface UpdateLatestNicknameDto {
  username: string;
  nickname: string;
}

@Controller()
export class AppController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get('get-pokemon/:username')
  getPokemon(@Param('username') username: string): string {
    //check if user is in users table, if not, then add the user.
    const ret = this.databaseService.addUser(username);

    if (ret) {
      //search pokemon that belongs to user
      const pokemonArr = this.databaseService.getPokemon(username);
      return JSON.stringify(pokemonArr);
    } else {
      console.log('unable to get pokemon');
      throw new BadRequestException('Invalid username provided');
    }
  }

  @Post('add-pokemon')
  addPokemon(@Body() body: AddPokemonDto): void {
    try {
      this.databaseService.addPokemon(body);
    } catch (error) {
      console.log('unable to add pokemon');
      console.log(error);
      throw new BadRequestException('Invalid data provided to add pokemon');
    }
  }

  @Post('update-latest-nickname')
  updateLatestNickname(@Body() body: UpdateLatestNicknameDto): void {
    try {
      this.databaseService.updateLatestNickname(body);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Invalid data provided to update pokemon nickname');
    }
  }
}
