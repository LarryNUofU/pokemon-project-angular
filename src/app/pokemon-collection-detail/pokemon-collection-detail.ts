import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap/collapse';
import { PokemonModel } from '../pokemon-model';

@Component({
  imports: [NgbCollapse, RouterLink],
  selector: 'app-pokemon-collection-detail',
  styleUrl: './pokemon-collection-detail.css',
  templateUrl: './pokemon-collection-detail.html',
})
export class PokemonCollectionDetail {


  pokemon = signal<PokemonModel | null>(null);

  readonly isDescriptionCollapsed = signal(false);
  readonly isAbilitiesCollapsed = signal(false);
  readonly isPhysicalCollapsed = signal(false);

  readonly isCollapsed = signal(false);

 setPageDetail(pokemon: PokemonModel) {
    this.pokemon.set(pokemon);
  }



}
