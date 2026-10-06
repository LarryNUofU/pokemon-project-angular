import { PokemonGenerationModel } from './pokemon-generation-model';

describe('PokemonGenerationModel', () => {
  it('should create an instance', () => {
    const generation = new PokemonGenerationModel({
      id: 1,
      name: 'generation-i',
      abilities: [],
      main_region: { name: 'kanto', url: 'https://pokeapi.co/api/v2/region/1/' },
      moves: [],
      names: [],
      pokemon_species: [],
      types: [],
      version_groups: [],
    });

    expect(generation).toBeTruthy();
  });
});
