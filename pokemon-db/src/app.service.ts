import { Injectable } from '@nestjs/common';
import Database from 'better-sqlite3';

@Injectable()
export class DatabaseService {


  
  constructor() {
    this.initializeDatabase();
  }





  getHello(): string {
    return 'Hello World!!!!!!!';
  }



initializeDatabase() {
  const database = new Database('pokemon.db');
  database.pragma('journal_mode = WAL');

    database.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username TEXT
      ) STRICT
    `);


    database.exec(`
      CREATE TABLE IF NOT EXISTS pokemon (
        id INTEGER PRIMARY KEY,
        username TEXT REFERENCES users(username),
        speciesId INTEGER,
        pokemonName TEXT
      ) STRICT
    `);

    const query = database.prepare('SELECT * FROM users ORDER BY id');
    console.log(query.all());

}




}
