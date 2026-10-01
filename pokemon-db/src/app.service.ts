import { Injectable } from '@nestjs/common';
import Database from 'better-sqlite3';

@Injectable()
export class DatabaseService {



  private database = new Database('pokemon.db');

  
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


  addPokemon(usernameValue: string) {

  }







initializeDatabase() {
  this.database.pragma('journal_mode = WAL');

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
        pokemonName TEXT NOT NULL
      ) STRICT
    `);

    const query = this.database.prepare('SELECT * FROM users ORDER BY id');
    console.log(query.all());

}




}
