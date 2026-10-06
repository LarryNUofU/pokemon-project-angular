import { inject, Service, signal } from '@angular/core';
import { AuthService } from './auth-service';

@Service()
export class PageClickService {

    authService = inject(AuthService);

    readonly active = signal(1);


    constructor() {
        if (!this.authService.isLoggedIn()) {
            this.active.set(4);
        }
        else {
            this.active.set(1);
        }
    }



    handleClick(activeId: number) {
        if (!this.authService.isLoggedIn()) {
            this.active.set(4);
        }
        else {
            this.active.set(activeId);
        }
    }



}
