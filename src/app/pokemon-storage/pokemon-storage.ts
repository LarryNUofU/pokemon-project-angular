import { Component, inject, signal, viewChild } from '@angular/core';
import { PokemonDatabase } from '../pokemon-database';
import { PokemonCollectionDetail } from '../pokemon-collection-detail/pokemon-collection-detail';
import { PokemonHttp } from '../pokemon-http';
import { PokemonCache } from '../pokemon-cache';

@Component({
  imports: [PokemonCollectionDetail],
  selector: 'app-pokemon-storage',
  styleUrl: './pokemon-storage.css',
  templateUrl: './pokemon-storage.html',
})
export class PokemonStorage {
  databaseService = inject(PokemonDatabase);
  readonly selectedButton = signal(-1);
  pokemonHttpService = inject(PokemonHttp);

  pokemonCacheService = inject(PokemonCache);

  pokemonCollectionDetail = viewChild(PokemonCollectionDetail);

  onSelect(speciesId: number, pokemonName: string) {
    const pokemonDetail = this.pokemonCollectionDetail();

    if (pokemonDetail) {
      const pokemonModel = this.pokemonCacheService.pokemonCache.get(speciesId);
      if (pokemonModel) {
        pokemonDetail.setPageDetail(pokemonModel);
      } else {
        this.pokemonHttpService.updatePokemonDetail(pokemonDetail, speciesId, pokemonName);
      }
    }
  }
}
