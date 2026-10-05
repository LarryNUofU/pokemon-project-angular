import { Component, inject, signal, viewChild } from '@angular/core';
import { PokemonDatabase } from '../pokemon-database';
import { HttpClient } from '@angular/common/http';
import { PokemonApiResponse, PokemonModel } from '../pokemon-model';
import { PokemonCollectionDetail } from '../pokemon-collection-detail/pokemon-collection-detail';

@Component({
  imports: [PokemonCollectionDetail],
  selector: 'app-pokemon-storage',
  styleUrl: './pokemon-storage.css',
  templateUrl: './pokemon-storage.html',
})
export class PokemonStorage {

  databaseService = inject(PokemonDatabase);
  readonly selectedButton = signal(-1);
  httpClient = inject(HttpClient);



  pokemonCollectionDetail = viewChild(PokemonCollectionDetail);


  onSelect(speciesId: number, pokemonName: string) {
    console.log("i've been selected: " + speciesId);

    this.httpClient.get<PokemonApiResponse>('https://pokeapi.co/api/v2/pokemon/' + speciesId).subscribe((value) => {
        const pokemon = new PokemonModel(value);
        pokemon.nickname = pokemonName;
        this.pokemonCollectionDetail()?.setPageDetail(pokemon);
      });


  }







}
