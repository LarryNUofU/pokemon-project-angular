import {Combobox, ComboboxPopup, ComboboxWidget} from '@angular/aria/combobox';
import {Listbox, Option} from '@angular/aria/listbox';
import {OverlayModule} from '@angular/cdk/overlay';
import {afterRenderEffect, Component, computed, signal, viewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { PokemonDetail } from '../pokemon-detail/pokemon-detail';


@Component({
  selector: 'app-pokemon-search',
  styleUrl: './pokemon-search.css',
  templateUrl: './pokemon-search.html',
  imports: [Combobox, ComboboxPopup, ComboboxWidget, Listbox, Option, OverlayModule, FormsModule, PokemonDetail]
})
export class PokemonSearch {

  clear() {
    this.query.set('');
    this.selectedOption.set([]);
    this.popupExpanded.set(false);
  }

  readonly listbox = viewChild(Listbox);
  readonly combobox = viewChild(Combobox);
  popupExpanded = signal(false);
  query = signal('');
  selectedOption = signal<string[]>([]);

  pokemonDetail = viewChild(PokemonDetail);


  pokemonList = computed(() =>
    ALL_POKEMON.filter((pokemonName) => pokemonName.toLowerCase().startsWith(this.query().toLowerCase())),
  );

   constructor() {
    afterRenderEffect(() => {
      if (this.combobox()?.expanded() === true) {
        this.listbox()?.scrollActiveItemIntoView();
      }
    });
  }


  onCommit() {
    const selected = this.selectedOption();
    if (selected.length > 0) {
      this.query.set(selected[0]);
      //Only call Pokemon detail to render itself when the user presses enter or finishes clicking an option in the dropdown
      this.pokemonDetail()?.setPageDetail(selected[0]);
    }
    this.popupExpanded.set(false);
    this.combobox()?.element.focus();

    




  }



}

const ALL_POKEMON = [
  'Pikachu',
  'Snorlax',
  'Charmander'
];
