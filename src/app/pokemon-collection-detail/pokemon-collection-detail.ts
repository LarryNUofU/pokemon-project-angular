import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap/collapse';
import { PokemonModel } from '../pokemon-model';
import { PageClickService } from '../page-click-service';
import { PokemonDetailImpl } from '../pokemon-detail/pokemon-detail';

@Component({
  imports: [NgbCollapse, RouterLink],
  selector: 'app-pokemon-collection-detail',
  styleUrl: './pokemon-collection-detail.css',
  templateUrl: './pokemon-collection-detail.html',
})
export class PokemonCollectionDetail implements PokemonDetailImpl {
  pokemon = signal<PokemonModel | null>(null);

  readonly isDescriptionCollapsed = signal(false);
  readonly isAbilitiesCollapsed = signal(false);
  readonly isPhysicalCollapsed = signal(false);

  readonly isCollapsed = signal(false);

  pageService = inject(PageClickService);

  setPageDetail(pokemon: PokemonModel, nickname: string) {
    pokemon.nickname = nickname;
    this.pokemon.set(pokemon);
  }
}
