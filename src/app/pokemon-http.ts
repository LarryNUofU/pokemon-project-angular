import { HttpClient } from '@angular/common/http';
import { inject, Service, WritableSignal } from '@angular/core';
import { PokemonDetailImpl } from './pokemon-detail/pokemon-detail';
import { PokemonApiResponse, PokemonModel, PokemonSpeciesApiResponse } from './pokemon-model';
import { PokemonDatabaseModelApiResponse, PokemonDatabaseModelPost, UpdateLatestNicknameDto } from './pokemon-database';
import { PokemonCache } from './pokemon-cache';

@Service()
export class PokemonHttp {


    angularHttpService = inject(HttpClient);
    pokemonCacheService = inject(PokemonCache);


    updatePokemonDetail(pokemonDetail: PokemonDetailImpl, pokemonId: number, pokemonNickname: string) {
        console.log("inside pokemonhttp service");
        this.angularHttpService.get<PokemonApiResponse>('https://pokeapi.co/api/v2/pokemon/' + pokemonId).subscribe((value) => {
                const pokemon = new PokemonModel(value);
                pokemon.nickname = pokemonNickname;
                 this.angularHttpService.get<PokemonSpeciesApiResponse>('https://pokeapi.co/api/v2/pokemon-species/' + pokemonId).subscribe((speciesValue) => {
                    pokemon.setFlavorText(speciesValue);
                    this.pokemonCacheService.pokemonCache.set(pokemonId, pokemon);
                    pokemonDetail.setPageDetail(pokemon);
                  });
              });
    }


    loadPokemonFromDatabase(pokemonList: WritableSignal<PokemonDatabaseModelApiResponse[]>, username: string) {
        this.angularHttpService.get<PokemonDatabaseModelApiResponse[]>('http://localhost:3000/get-pokemon/' + username).subscribe((value) => {
                pokemonList.set(value);
        });
    }


    addPokemonToDatabase(pokemonList: WritableSignal<PokemonDatabaseModelApiResponse[]>, postObjDatabaseModel: PokemonDatabaseModelPost) {
 
         this.angularHttpService.post('http://localhost:3000/add-pokemon/', postObjDatabaseModel, { responseType: 'text' }).subscribe({
            next: (retPost) => {
                //refresh list
                this.loadPokemonFromDatabase(pokemonList, postObjDatabaseModel.username);
            },
            error: (error) => console.error("failed to add pokemon")
        });
    }


    updateLatestPokemonNameToDatabase(pokemonList: WritableSignal<PokemonDatabaseModelApiResponse[]>, postObjLatestNickname: UpdateLatestNicknameDto) {
        this.angularHttpService.post('http://localhost:3000/update-latest-nickname/', postObjLatestNickname, { responseType: 'text' }).subscribe({
            next: (retPost) => {
                this.loadPokemonFromDatabase(pokemonList, postObjLatestNickname.username);
            },
            error: (error) => console.error("failed to update pokemon nickname")
        });
    }





}
