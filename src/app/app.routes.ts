import { Routes } from '@angular/router';
import { PokemonSearch } from './pokemon-search/pokemon-search';
import { UserLogin } from './user-login/user-login';
import { authGuard, AuthService } from './auth-service';
import { Home } from './home/home';

export const routes: Routes = [

    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: Home,  canActivate: [authGuard]},
    {path: 'search', component: PokemonSearch, canActivate: [authGuard]},
    {path: 'login', component: UserLogin}
];
