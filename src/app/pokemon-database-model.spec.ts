import { PokemonDatabaseModel } from './pokemon-database-model';

describe('PokemonDatabaseModel', () => {
  it('should create an instance', () => {
    const model = new PokemonDatabaseModel([]);

    expect(model).toBeTruthy();
    expect(model.pokemonList).toEqual([]);
  });
});
