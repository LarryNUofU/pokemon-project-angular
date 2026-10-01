import { Component, inject, signal } from '@angular/core';
import { PokemonCache } from '../pokemon-cache';
import { HttpClient } from '@angular/common/http';
import { PokemonApiResponse, PokemonModel } from '../pokemon-model';
import { PokemonGenerationApiResponse, PokemonGenerationModel } from '../pokemon-generation-model';
import { PokemonDatabase, PokemonDatabaseModelPost } from '../pokemon-database';
import { AuthService } from '../auth-service';

@Component({
  imports: [],
  selector: 'app-pokemon-catch',
  styleUrl: './pokemon-catch.css',
  templateUrl: './pokemon-catch.html',
})
export class PokemonCatch {


  pokemonCache = inject(PokemonCache);
  httpClient = inject(HttpClient);
  databaseService = inject(PokemonDatabase);
  authService = inject(AuthService);

  // pokemonName = signal("");
  // pokemonId = signal(0);


  pokemon = signal<PokemonModel | null>(null);




  private getIdFromUrl(url: string): number {
        const match = url.match(/\/(\d+)\/?$/);
        return match ? Number(match[1]) : -1;
  }



  catchPokemon(id: number): void {
    // console.log('Pokemon caught!');


    //check if generation object is in cache

    //get generation object
    this.httpClient.get<PokemonGenerationApiResponse>('https://pokeapi.co/api/v2/generation/' + id).subscribe((value) => {
        const pokemonGeneration = new PokemonGenerationModel(value);
        console.log(pokemonGeneration);

        let genName = pokemonGeneration.name;
        let idArr: number[] = [];

        pokemonGeneration.pokemonSpecies.forEach((species) => {
          idArr.push(this.getIdFromUrl(species.url));
        });

        this.pokemonCache.addToGenerationMap(genName, idArr);


        let chosenId = this.choosePokemon(idArr);
        // this.pokemonId.set(chosenId);
        // this.pokemonName.set(this.pokemonCache.allValidPokemonIdToNameMap.get(chosenId) ?? "");


        //check if pokemon is in the cache


        //else
        this.httpClient.get<PokemonApiResponse>('https://pokeapi.co/api/v2/pokemon/' + chosenId).subscribe((value) => {
            this.pokemon.set(new PokemonModel(value));
              //Add pokemon

              const sqliteTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

              let postObj: PokemonDatabaseModelPost = {
                username: this.authService.getCurrentUsername(),
                speciesId: this.pokemon()?.id,
                pokemonName: this.pokemon()?.displayName,
                date: sqliteTimestamp
              }


              console.log("adding pokemon");
              console.log(postObj);

              this.databaseService.addPokemon(postObj);
              });

    });



  }


  choosePokemon(list: number[]): number {

      let max = list.length - 1;
      let min = 0;
      return list[Math.floor(Math.random() * (max - min + 1)) + min];
  }
}
