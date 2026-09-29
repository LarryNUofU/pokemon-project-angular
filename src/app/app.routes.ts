import { Routes } from '@angular/router';
import { PokemonSearch } from './pokemon-search/pokemon-search';
import { UserLogin } from './user-login/user-login';
import { authGuard, AuthService } from './auth-service';
import { Home } from './home/home';
import { PokemonCatch } from './pokemon-catch/pokemon-catch';

export const routes: Routes = [

    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: Home,  canActivate: [authGuard]},
    {path: 'search', component: PokemonSearch, canActivate: [authGuard]},
    {path: 'catch', component: PokemonCatch, canActivate: [authGuard]},
    {path: 'login', component: UserLogin}
];
