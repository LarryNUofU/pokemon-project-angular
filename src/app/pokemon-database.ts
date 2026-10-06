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


export interface UpdateLatestNicknameDto {
  username: string;
  nickname: string;
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


    updateLatestNickname(postObj: UpdateLatestNicknameDto) {

        this.httpClient.post('http://localhost:3000/update-latest-nickname/', postObj, { responseType: 'text' }).subscribe({
            next: (retPost) => {
                this.loadPokemon(postObj.username);
            },
            error: (error) => console.error("failed to update pokemon nickname")
        });
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
