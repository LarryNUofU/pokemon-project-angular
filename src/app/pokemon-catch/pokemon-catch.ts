import { Component, inject, signal } from '@angular/core';
import { PokemonCache } from '../pokemon-cache';
import { HttpClient } from '@angular/common/http';
import { PokemonApiResponse, PokemonModel } from '../pokemon-model';
import { PokemonGenerationApiResponse, PokemonGenerationModel } from '../pokemon-generation-model';
import { PokemonDatabase, PokemonDatabaseModelPost, UpdateLatestNicknameDto } from '../pokemon-database';
import { AuthService } from '../auth-service';
import { NgClass } from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';



@Component({
  imports: [NgClass, ReactiveFormsModule],
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


  selectedGeneration = signal<number | null>(null);




  private getIdFromUrl(url: string): number {
        const match = url.match(/\/(\d+)\/?$/);
        return match ? Number(match[1]) : -1;
  }


   applyForm = new FormGroup({
      username: new FormControl(''),
    });



  catchPokemon(id: number): void {
    // console.log('Pokemon caught!');

    this.selectedGeneration.set(id);


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



  buttonClasses(id: number) {

    if (id != this.selectedGeneration()) {
      return {};
    }
    else {
        return {
        gen1: this.selectedGeneration() === 1,
        gen2: this.selectedGeneration() === 2,
        gen3: this.selectedGeneration() === 3,
        gen4: this.selectedGeneration() === 4,
        gen5: this.selectedGeneration() === 5,
        gen6: this.selectedGeneration() === 6,
        gen7: this.selectedGeneration() === 7,
        gen8: this.selectedGeneration() === 8,
        gen9: this.selectedGeneration() === 9,
      };
    }
  }

  backgroundColor() {
      switch (this.selectedGeneration()) {
        case 1: 
            return "lavender"; 
        case 2:
            return "yellow";  
        case 3:
            return "#DC143C";  
        case 4:
          return "green";  
        case 5:
          return "lightgrey";  
        case 6:
          return "burlywood";  
        case 7:
          return "#1ed2ff";  
        case 8:
          return "#012169";  
        case 9:
          return "#ffd580";  
        default:
            return "";
      }
  }



  submitForm() {
    let name = this.applyForm.value.username ?? '';

    let postObj: UpdateLatestNicknameDto = {
                username: this.authService.getCurrentUsername(),
                nickname: name
        }

    this.databaseService.updateLatestNickname(postObj);


    const pokemon = this.pokemon();
    if (pokemon) {
      pokemon.nickname = name;
    }

    this.applyForm.reset();

  }




}
