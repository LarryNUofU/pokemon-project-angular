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
      CREATE TABLE IF NOT EXISTS data (
        key INTEGER PRIMARY KEY,
        value TEXT
      ) STRICT
    `);

    const query = database.prepare('SELECT * FROM data ORDER BY key');
    console.log(query.all());

}




}
