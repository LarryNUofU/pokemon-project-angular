import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonModel } from '../pokemon-model';

@Component({
  imports: [],
  selector: 'app-pokemon-detail',
  styleUrl: './pokemon-detail.css',
  templateUrl: './pokemon-detail.html',
})

export class PokemonDetail {


  pokemon = signal<PokemonModel | null>(null);


  setPageDetail(pokemon: PokemonModel) {
    this.pokemon.set(pokemon);
  }



}
