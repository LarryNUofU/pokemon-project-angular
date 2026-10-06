import { Component, inject, signal, viewChild } from '@angular/core';
import { PokemonDatabase } from '../pokemon-database';
import { HttpClient } from '@angular/common/http';
import { PokemonApiResponse, PokemonModel, PokemonSpeciesApiResponse } from '../pokemon-model';
import { PokemonCollectionDetail } from '../pokemon-collection-detail/pokemon-collection-detail';
import { PokemonHttp } from '../pokemon-http';

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


  pokemonCollectionDetail = viewChild(PokemonCollectionDetail);


  onSelect(speciesId: number, pokemonName: string) {
    console.log("i've been selected: " + speciesId);

    const pokemonDetail = this.pokemonCollectionDetail();

    if (pokemonDetail) {
        this.pokemonHttpService.updatePokemonDetail(pokemonDetail, speciesId, pokemonName);
    }
  }







}
