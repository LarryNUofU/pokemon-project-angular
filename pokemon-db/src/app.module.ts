import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { DatabaseService } from './app.service.js';


// const databaseProvider = {
//    provide: 'DATABASE_CONNECTION',
//   useFactory: async () => {
//     // NestJS halts bootstrap here until this promise resolves
//     const connection = await createConnection({
//       host: 'localhost',
//       port: 5432,
//     });
//     return connection;
//   },
// };





@Module({
  imports: [],
  controllers: [AppController],
  providers: [DatabaseService],
})
export class AppModule {}
