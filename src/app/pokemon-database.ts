import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';





export interface PokemonDatabaseModelApiResponse {
     id: number;
     username: string;
     speciesId: number;
     pokemonName: string;
     date: string;
}



export interface PokemonDatabaseModelPost {
     username: string;
     speciesId: number | undefined;
     pokemonName: string | undefined;
     date: string;
}





@Service()
export class PokemonDatabase {

    pokemonList = signal<PokemonDatabaseModelApiResponse[]>([]);

    httpClient = inject(HttpClient);

    retPost: string = "";


    loadPokemon(username: string) {
         this.httpClient.get<PokemonDatabaseModelApiResponse[]>('http://localhost:3000/get-pokemon/' + username).subscribe((value) => {
                this.pokemonList.set(value);
        });
    }



    addPokemon(postObj: PokemonDatabaseModelPost) {

        //const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.httpClient.post('http://localhost:3000/add-pokemon/', postObj, { responseType: 'text' }).subscribe({
            next: (retPost) => {
                console.log("refreshing list");
                //refresh list
                this.loadPokemon(postObj.username);
            },
            error: (error) => console.error("failed to add pokemon")
        });



      

    }








}
