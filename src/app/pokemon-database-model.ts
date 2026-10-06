


export interface PokemonDatabaseModelApiResponse {
     id: number;
     username: string;
     speciesId: number;
     pokemonName: string;
}




export class PokemonDatabaseModel {

    pokemonList: PokemonDatabaseModelApiResponse[];


    constructor(response: PokemonDatabaseModelApiResponse[]) {
        this.pokemonList = response;
    }


}
