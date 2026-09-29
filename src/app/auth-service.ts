import { inject, Service } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

@Service()
export class AuthService {

    private username: string = "";

    isLoggedIn(): boolean {
        return this.username != "";
    }


    setUsername(username: string) {
        this.username = username;
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
