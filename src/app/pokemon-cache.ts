import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PokemonModel } from './pokemon-model';

interface Result {
	name: string;
	url: string;
}

interface Results {
    results: Result[];
}



@Service()
export class PokemonCache {


    private readonly httpClient = inject(HttpClient);

    readonly pokemonCache = new Map<number, PokemonModel>();

    readonly allValidPokemonNameToIdMap: Map<string, number> = new Map();
    readonly allValidPokemonIds = new Set<number>();

    private readonly MAX_POKEMON_ID = 1026;




    private getIdFromUrl(url: string): number {
        const match = url.match(/\/(\d+)\/?$/);
        return match ? Number(match[1]) : -1;
    }



    async loadPokemonIndex(): Promise<void> {
        //TODO: make the method more precise without limiting to specific number
        const resultsObj = await firstValueFrom(
            this.httpClient.get<Results>('https://pokeapi.co/api/v2/pokemon/?limit=1026'),
        );

        this.allValidPokemonNameToIdMap.clear();
        this.allValidPokemonIds.clear();
        resultsObj.results.forEach((item) => {
            const id = this.getIdFromUrl(item.url);
            this.allValidPokemonNameToIdMap.set(item.name, id);
            if (id > 0) {
                this.allValidPokemonIds.add(id);
            }
        });
    }


    checkIfValidId(id: number): boolean {
        return (typeof id == "number" && id > 0 && id <= this.MAX_POKEMON_ID);
    }
}
