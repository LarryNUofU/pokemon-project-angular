import { Component, inject } from '@angular/core';
import { PokemonCache } from '../pokemon-cache';
import { HttpClient } from '@angular/common/http';
import { PokemonApiResponse } from '../pokemon-model';
import { PokemonGenerationApiResponse, PokemonGenerationModel } from '../pokemon-generation-model';

@Component({
  imports: [],
  selector: 'app-pokemon-catch',
  styleUrl: './pokemon-catch.css',
  templateUrl: './pokemon-catch.html',
})
export class PokemonCatch {


  pokemonCache = inject(PokemonCache);
  httpClient = inject(HttpClient);



  catchPokemon(id: number): void {
    // console.log('Pokemon caught!');


    //check if generation object is in cache

    //get generation object
    this.httpClient.get<PokemonGenerationApiResponse>('https://pokeapi.co/api/v2/generation/' + id).subscribe((value) => {
        const pokemonGeneration = new PokemonGenerationModel(value);
        console.log(pokemonGeneration);

        let genName = pokemonGeneration.name;
        let nameArr = [];

        pokemonGeneration.pokemonSpecies.forEach((species) => {
          nameArr.push(species.name);
        })





    });
  }
}
