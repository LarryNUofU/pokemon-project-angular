import { Injectable } from '@nestjs/common';
import { DatabaseSync } from 'node:sqlite';
import { AddPokemonDto, UpdateLatestNicknameDto } from './app.controller.js';

@Injectable()
export class DatabaseService {
  private database = new DatabaseSync('pokemon.db');

  constructor() {
    this.initializeDatabase();
  }





  getHello(): string {
    return 'Hello World!!!!!!!';
  }


  addUser(usernameValue: string): boolean {
    const checkUsernameExistsQuery = this.database.prepare(`
      SELECT * FROM users
      WHERE username = ?
      `);


      let queryRes = checkUsernameExistsQuery.get(usernameValue);

      if (!queryRes) {
          try {
            //add user
            const addUserRes = this.database
            .prepare('INSERT INTO users (username) VALUES (?)')
            .run(usernameValue);
          }
          catch (error) {
            console.error("could not add user");
            return false;
          }
      }

      return true;



  }


  getPokemon(usernameValue: string) {
    const getPokemonQuery = this.database.prepare(`
      SELECT * FROM pokemon
      WHERE username = ?
      `);

      const pokemonQueryRes = getPokemonQuery.all(usernameValue);

      return pokemonQueryRes;
  }


  addPokemon(addPokemon: AddPokemonDto) {
    if (typeof addPokemon.speciesId !== 'number' || typeof addPokemon.pokemonName !== 'string') {
      throw new Error('Invalid pokemon data provided');
    }

    const addPokemonQuery = this.database.prepare(`
      INSERT INTO pokemon (username, speciesId, pokemonName, date)
      VALUES(?, ?, ?, ?)`).run(addPokemon.username, addPokemon.speciesId, addPokemon.pokemonName, addPokemon.date);
    return addPokemonQuery;
  }


  updateLatestNickname(updateNickname: UpdateLatestNicknameDto) {
     const addPokemonQuery = this.database.prepare(`
      UPDATE pokemon
      SET pokemonName = ?
      WHERE id = (SELECT MAX(id) FROM pokemon WHERE username=?)`).run(updateNickname.nickname, updateNickname.username);
  }





  initializeDatabase() {
    this.database.exec('PRAGMA journal_mode = WAL');

    this.database.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username TEXT UNIQUE
      ) STRICT
    `);

    this.database.exec(`
      CREATE TABLE IF NOT EXISTS pokemon (
        id INTEGER PRIMARY KEY,
        username TEXT NOT NULL REFERENCES users(username),
        speciesId INTEGER NOT NULL,
        pokemonName TEXT NOT NULL,
        date TEXT NOT NULL
      ) STRICT
    `);

    const query = this.database.prepare('SELECT * FROM users ORDER BY id');
    console.log(query.all());
  }


}
