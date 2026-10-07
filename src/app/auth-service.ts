import { inject, Service } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

@Service()
export class AuthService {
  private username: string = '';

  isLoggedIn(): boolean {
    return this.username != '' && this.username != null;
  }

  setUsername(username: string) {
    this.username = username;
    this.saveUser(username);
  }

  constructor() {
    localStorage.clear();
    this.username = this.getUser();
  }

  // 1. Save data to sessionStorage. If tab is closed, then data is cleared. Refreshes still keep the data
  saveUser(name: string): void {
    sessionStorage.setItem('username-pokemon-project-ln', name);
  }

  getUser(): any {
    const data = sessionStorage.getItem('username-pokemon-project-ln');
    console.log('data: ' + data);
    return data;
  }

  getCurrentUsername() {
    return this.username;
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // Allow access
  } else {
    // Redirect to login page and deny access
    return router.createUrlTree(['/login']);
  }
};
