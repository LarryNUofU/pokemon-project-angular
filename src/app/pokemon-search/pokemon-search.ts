import {Combobox, ComboboxPopup, ComboboxWidget} from '@angular/aria/combobox';
import {Listbox, Option} from '@angular/aria/listbox';
import {OverlayModule} from '@angular/cdk/overlay';
import {afterRenderEffect, Component, computed, inject, signal, viewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { PokemonDetail } from '../pokemon-detail/pokemon-detail';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonApiResponse, PokemonModel, PokemonSpeciesApiResponse } from '../pokemon-model';
import { PokemonCache } from '../pokemon-cache';
import { PokemonHttp } from '../pokemon-http';


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


  pokemonCache = inject(PokemonCache);

  pokemonDetail = viewChild(PokemonDetail);


  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

//   private pokemonNames = signal([
//   'Pikachu',
//   'Snorlax',
//   'Charmander',
// ]);

private pokemonNamesArr: string[] = [];



  //Angular HTTP service guide: https://angular.dev/guide/http/setup
  pokemonHttpService = inject(PokemonHttp);




  private pokemonId: number = -1;

  pokemonList = computed(() =>
    this.pokemonNamesArr.filter((pokemonName) => pokemonName.toLowerCase().startsWith(this.query().toLowerCase())),
  );

   constructor() {
      afterRenderEffect(() => {
        if (this.combobox()?.expanded() === true) {
          this.listbox()?.scrollActiveItemIntoView();
        }
      });



      this.pokemonNamesArr = [...this.pokemonCache.allValidPokemonNameToIdMap.keys()].sort().map((val) => {
        return val.charAt(0).toUpperCase() + val.slice(1);
      });
      


     this.activatedRoute.queryParams.subscribe((params) => {
      this.pokemonId = parseInt(params['id'] || '');
      console.log('pokemon ID:', this.pokemonId);

      if (!this.pokemonCache.checkIfValidId(this.pokemonId)) {
          console.log("not valid id:" + this.pokemonId);
          this.pokemonId = -1;
      }


      if (this.pokemonId == -1) {
          this.router.navigate([], {
            queryParams: {},
            replaceUrl: true // Optional: Replaces the current history entry instead of adding a new one
          });
      }
      else {
        //child might not be rendered yet when it gets here after loading in from outside the route or if page is refreshed/URL changed from outside. This case is handled in ngAfterViewInit()

        //TODO: check if in cache, otherwise call the API here
        this.loadPokemonDetail();
      }
    });

  }



  ngAfterViewInit() {
      this.loadPokemonDetail();
      this.combobox()?.element.focus();
  }

  private loadPokemonDetail() {
    const detail = this.pokemonDetail();
    if (this.pokemonId != -1 && detail) {
        this.pokemonHttpService.updatePokemonDetail(detail, this.pokemonId, "");
    }   

  }


  onCommit() {
    const selected = this.selectedOption();
    if (selected.length > 0) {
      this.query.set(selected[0]);
      //Only call Pokemon detail to render itself when the user presses enter or finishes clicking an option in the dropdown
      const id = this.pokemonCache.allValidPokemonNameToIdMap.get(selected[0].toLowerCase());
      this.router.navigate([], {
      queryParams: {id},
      queryParamsHandling: 'merge', // Preserve other query parameters
    });
    }
    this.popupExpanded.set(false);
    this.combobox()?.element.focus();
  }





}