import { PokemonDatabaseModel } from './pokemon-database-model.js';

describe('PokemonDatabaseModel', () => {
  it('should be defined', () => {
    expect(new PokemonDatabaseModel()).toBeDefined();
  });
});
