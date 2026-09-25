import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-pokemon-detail',
  styleUrl: './pokemon-detail.css',
  templateUrl: './pokemon-detail.html',
})

export class PokemonDetail {


  pokemonName = signal(0);


  setPageDetail(pokemonId: number) {
    console.log("this is being called: " + pokemonId);
    this.pokemonName.set(pokemonId);
  }



}
