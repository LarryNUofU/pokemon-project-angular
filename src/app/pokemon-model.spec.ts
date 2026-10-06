import { PokemonModel } from './pokemon-model';

describe('PokemonModel', () => {
  it('should create an instance', () => {
    const pokemon = new PokemonModel({
      id: 3,
      name: 'venusaur',
      height: 20,
      weight: 1000,
      abilities: [
        {
          is_hidden: false,
          slot: 1,
          ability: { name: 'overgrow', url: 'https://pokeapi.co/api/v2/ability/65/' },
        },
      ],
      types: [
        {
          slot: 1,
          type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' },
        },
      ],
      sprites: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
        back_default: null,
        front_shiny: null,
        back_shiny: null,
      },
    });

    expect(pokemon).toBeTruthy();
    expect(pokemon.name).toBe('venusaur');
    expect(pokemon.isGrassType()).toBe(true);
    expect(pokemon.abilities[0].ability.name).toBe('overgrow');
    expect(pokemon.sprites.front_default).toContain('/3.png');
  });
});
