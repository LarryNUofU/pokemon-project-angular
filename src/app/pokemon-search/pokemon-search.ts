import {Combobox, ComboboxPopup, ComboboxWidget} from '@angular/aria/combobox';
import {Listbox, Option} from '@angular/aria/listbox';
import {OverlayModule} from '@angular/cdk/overlay';
import {afterRenderEffect, Component, computed, signal, viewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-pokemon-search',
  styleUrl: './pokemon-search.css',
  templateUrl: './pokemon-search.html',
  imports: [Combobox, ComboboxPopup, ComboboxWidget, Listbox, Option, OverlayModule, FormsModule]
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
