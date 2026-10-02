import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonModel } from '../pokemon-model';
import {
	NgbAccordionButton,
	NgbAccordionDirective,
	NgbAccordionItem,
	NgbAccordionHeader,
	NgbAccordionToggle,
	NgbAccordionBody,
	NgbAccordionCollapse,
} from '@ng-bootstrap/ng-bootstrap/accordion';

import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap/collapse';

@Component({
  imports: [NgbAccordionButton, NgbAccordionDirective, NgbAccordionItem, NgbAccordionHeader, NgbAccordionToggle, NgbAccordionBody, NgbAccordionCollapse, NgbCollapse],
  selector: 'app-pokemon-detail',
  styleUrl: './pokemon-detail.css',
  templateUrl: './pokemon-detail.html',
})

export class PokemonDetail {


  pokemon = signal<PokemonModel | null>(null);

  readonly isCollapsed = signal(false);


  setPageDetail(pokemon: PokemonModel) {
    this.pokemon.set(pokemon);
  }



}
