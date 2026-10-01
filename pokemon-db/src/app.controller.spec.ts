import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller.js';
import { DatabaseService } from './app.service.js';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [DatabaseService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getPokemon()).toBe('Hello World!');
    });
  });
});
