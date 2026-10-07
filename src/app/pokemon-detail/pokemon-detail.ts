import { Component, signal } from '@angular/core';
import { PokemonModel } from '../pokemon-model';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap/collapse';

export interface PokemonDetailImpl {
  setPageDetail(pokemon: PokemonModel): void;
}

@Component({
  imports: [NgbCollapse],
  selector: 'app-pokemon-detail',
  styleUrl: './pokemon-detail.css',
  templateUrl: './pokemon-detail.html',
})
export class PokemonDetail implements PokemonDetailImpl {
  pokemon = signal<PokemonModel | null>(null);

  readonly isDescriptionCollapsed = signal(false);
  readonly isAbilitiesCollapsed = signal(false);
  readonly isPhysicalCollapsed = signal(false);

  setPageDetail(pokemon: PokemonModel) {
    this.pokemon.set(pokemon);
  }
}
