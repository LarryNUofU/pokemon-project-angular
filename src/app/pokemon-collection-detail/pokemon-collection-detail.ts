import { Component, signal } from '@angular/core';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap/collapse';
import { PokemonModel } from '../pokemon-model';

@Component({
  imports: [NgbCollapse],
  selector: 'app-pokemon-collection-detail',
  styleUrl: './pokemon-collection-detail.css',
  templateUrl: './pokemon-collection-detail.html',
})
export class PokemonCollectionDetail {


  pokemon = signal<PokemonModel | null>(null);

  readonly isCollapsed = signal(false);

 setPageDetail(pokemon: PokemonModel) {
    this.pokemon.set(pokemon);
  }



}
