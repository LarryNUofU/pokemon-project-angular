import { Component, inject, signal } from '@angular/core';
import { PokemonCache } from '../pokemon-cache';
import { PokemonModel } from '../pokemon-model';
import { PokemonGenerationModel } from '../pokemon-generation-model';
import { PokemonDatabase, PokemonDatabaseModelPost, UpdateLatestNicknameDto } from '../pokemon-database';
import { AuthService } from '../auth-service';
import { NgClass } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PokemonHttp } from '../pokemon-http';

@Component({
  imports: [NgClass, ReactiveFormsModule],
  selector: 'app-pokemon-catch',
  styleUrl: './pokemon-catch.css',
  templateUrl: './pokemon-catch.html',
})
export class PokemonCatch {
  pokemonCacheService = inject(PokemonCache);
  pokemonHttpService = inject(PokemonHttp);
  databaseService = inject(PokemonDatabase);
  authService = inject(AuthService);

  pokemon = signal<PokemonModel | null>(null);

  selectedGeneration = signal<number | null>(null);

  private getIdFromUrl(url: string): number {
    const match = url.match(/\/(\d+)\/?$/);
    return match ? Number(match[1]) : -1;
  }

  applyForm = new FormGroup({
    username: new FormControl(''),
  });

  async catchPokemon(id: number): Promise<void> {
    this.selectedGeneration.set(id);

    //check if generation object is in cache
    const genListCache = this.pokemonCacheService.generationMapToIdList.get(id);
    let idArr: number[] = [];
    if (id && genListCache) {
      console.log('generation is in cache');
      idArr = genListCache;
    } else {
      const pokemonGeneration = await this.pokemonHttpService.getGenerationModelAsync(id);
      idArr = this.getGenList(pokemonGeneration, id, this.pokemonCacheService);
    }

    let chosenId = this.choosePokemon(idArr);

    //check if pokemon is in the cache
    const pokemonModelCache = this.pokemonCacheService.pokemonCache.get(chosenId);
    let pokemonModel = null;
    if (pokemonModelCache) {
      console.log('pokemon is in cache - generation');
      pokemonModel = pokemonModelCache;
    } else {
      pokemonModel = await this.pokemonHttpService.getPokemonModelAsync(chosenId);
    }

    this.pokemon.set(pokemonModel);
    //Add pokemon
    if (this.pokemon()) {
      this.addPokemonToDatabase(pokemonModel, this.databaseService, this.authService);
    }
  }


  getGenList(genModel: PokemonGenerationModel, genNumber: number, pokemonCache: PokemonCache): number[] {
    let idArr: number[] = [];
    genModel.pokemonSpecies.forEach((species) => {
      idArr.push(this.getIdFromUrl(species.url));
    });
    pokemonCache.addToGenerationMap(genNumber, idArr);
    return idArr;
  }


  choosePokemon(list: number[]): number {
    let max = list.length - 1;
    let min = 0;
    return list[Math.floor(Math.random() * (max - min + 1)) + min];
  }


  addPokemonToDatabase(pokemonModel: PokemonModel, databaseService: PokemonDatabase, authService: AuthService) {
    const sqliteTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let postObj: PokemonDatabaseModelPost = {
      username: authService.getCurrentUsername(),
      speciesId: pokemonModel.id,
      pokemonName: pokemonModel.displayName,
      date: sqliteTimestamp,
    };
    databaseService.addPokemon(postObj);
  }


  buttonClasses(id: number) {
    if (id != this.selectedGeneration()) {
      return {};
    } else {
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
        return 'lavender';
      case 2:
        return 'yellow';
      case 3:
        return '#DC143C';
      case 4:
        return 'green';
      case 5:
        return 'lightgrey';
      case 6:
        return 'burlywood';
      case 7:
        return '#1ed2ff';
      case 8:
        return '#012169';
      case 9:
        return '#ffd580';
      default:
        return '';
    }
  }


  submitForm() {
    let name = this.applyForm.value.username ?? '';

    let postObj: UpdateLatestNicknameDto = {
      username: this.authService.getCurrentUsername(),
      nickname: name,
    };

    this.databaseService.updateLatestNickname(postObj);

    const pokemon = this.pokemon();
    if (pokemon) {
      pokemon.nickname = name;
    }

    this.applyForm.reset();
  }
}
