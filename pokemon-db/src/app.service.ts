import { Injectable } from '@nestjs/common';
import { DatabaseSync } from 'node:sqlite';

@Injectable()
export class DatabaseService {


  
  constructor() {
    this.initializeDatabase();
  }





  getHello(): string {
    return 'Hello World!!!';
  }



initializeDatabase() {
  const database = new DatabaseSync('pokemon.db');

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
