import { Routes } from '@angular/router';
import { PokemonSearch } from './pokemon-search/pokemon-search';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'search', component: PokemonSearch}
];
