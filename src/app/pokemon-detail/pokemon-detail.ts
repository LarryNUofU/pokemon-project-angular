import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-pokemon-detail',
  styleUrl: './pokemon-detail.css',
  templateUrl: './pokemon-detail.html',
})

export class PokemonDetail {




  setPageDetail(pokemonName: string) {
    console.log("this is being called: " + pokemonName);
  }



}
