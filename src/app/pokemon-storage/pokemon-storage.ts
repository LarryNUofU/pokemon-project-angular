import { Component, inject, signal } from '@angular/core';
import { PokemonDatabase } from '../pokemon-database';

@Component({
  imports: [],
  selector: 'app-pokemon-storage',
  styleUrl: './pokemon-storage.css',
  templateUrl: './pokemon-storage.html',
})
export class PokemonStorage {

  //items = signal<number[]>([]);
  databaseService = inject(PokemonDatabase);


  



}
