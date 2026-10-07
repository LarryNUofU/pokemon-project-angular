import { Routes } from '@angular/router';
import { PokemonSearch } from './pokemon-search/pokemon-search';
import { UserLogin } from './user-login/user-login';
import { authGuard } from './auth-service';
import { PokemonCatch } from './pokemon-catch/pokemon-catch';
import { PokemonStorage } from './pokemon-storage/pokemon-storage';

export const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: PokemonSearch, canActivate: [authGuard] },
  { path: 'catch', component: PokemonCatch, canActivate: [authGuard] },
  { path: 'storage', component: PokemonStorage, canActivate: [authGuard] },
  { path: 'login', component: UserLogin },
];
