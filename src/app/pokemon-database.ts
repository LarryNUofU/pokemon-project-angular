import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { PokemonHttp } from './pokemon-http';





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


export interface UpdateLatestNicknameDto {
  username: string;
  nickname: string;
}




@Service()
export class PokemonDatabase {

    pokemonList = signal<PokemonDatabaseModelApiResponse[]>([]);

    pokemonHttpService = inject(PokemonHttp);

    loadPokemon(username: string) {
        this.pokemonHttpService.loadPokemonFromDatabase(this.pokemonList, username);
    }



    addPokemon(postObj: PokemonDatabaseModelPost) {

        this.pokemonHttpService.addPokemonToDatabase(this.pokemonList, postObj);

    }


    updateLatestNickname(postObj: UpdateLatestNicknameDto) {
        this.pokemonHttpService.updateLatestPokemonNameToDatabase(this.pokemonList, postObj);
    }



    //converts timezone from UTC (stored as UTC in database) to local time
    toAmPm(timestamp: string) {
        const [datePart, timePart] = timestamp.split(" ");
        const date = new Date(`${datePart}T${timePart}Z`); // Z means UTC

        const pad = (value: number) => String(value).padStart(2, "0");
        const localDate =
            `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

        const localTime = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
        });

        return `${localDate} ${localTime}`;
    }








}
