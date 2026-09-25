import {Combobox, ComboboxPopup, ComboboxWidget} from '@angular/aria/combobox';
import {Listbox, Option} from '@angular/aria/listbox';
import {OverlayModule} from '@angular/cdk/overlay';
import {afterRenderEffect, Component, computed, inject, signal, viewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { PokemonDetail } from '../pokemon-detail/pokemon-detail';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-pokemon-search',
  styleUrl: './pokemon-search.css',
  templateUrl: './pokemon-search.html',
  imports: [Combobox, ComboboxPopup, ComboboxWidget, Listbox, Option, OverlayModule, FormsModule, PokemonDetail]
})





//Can take in a query parameter called "id". If the "id" is valid (by checking in the map), then it wil pass it down to the child to be rendered. Otherwise, it will redirect to the /search/ url without any query params

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


  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);


  private pokemonId = 1;

  pokemonList = computed(() =>
    ALL_POKEMON.filter((pokemonName) => pokemonName.toLowerCase().startsWith(this.query().toLowerCase())),
  );

   constructor() {
      afterRenderEffect(() => {
        if (this.combobox()?.expanded() === true) {
          this.listbox()?.scrollActiveItemIntoView();
        }
      });


     this.activatedRoute.queryParams.subscribe((params) => {
      this.pokemonId = params['id'] || '';
      console.log('pokemon ID:', this.pokemonId);

      let validId = false;
      if (!(this.pokemonId == 123)) {
          this.router.navigate([], {
            queryParams: {},
            replaceUrl: true // Optional: Replaces the current history entry instead of adding a new one
          });
          this.pokemonId = -1;
      }
      else {
        //child might not be rendered yet when it gets here after loading in from outside the route or if page is refreshed/URL changed from outside. This case is handled in ngAfterViewInit()
        this.pokemonDetail()?.setPageDetail(this.pokemonId);
      }
      

    });

  }



  ngAfterViewInit() {
      if (this.pokemonId == 123) {
        this.pokemonDetail()?.setPageDetail(this.pokemonId);
      }
  }


  onCommit() {
    const selected = this.selectedOption();
    if (selected.length > 0) {
      this.query.set(selected[0]);
      //Only call Pokemon detail to render itself when the user presses enter or finishes clicking an option in the dropdown
      //probably need to clear out query params
      //this.pokemonDetail()?.setPageDetail(selected[0]);
      const id = 123;
      this.router.navigate([], {
      queryParams: {id},
      queryParamsHandling: 'merge', // Preserve other query parameters
    });
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
