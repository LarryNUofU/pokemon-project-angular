import { Component, inject } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-user-login',
  styleUrl: './user-login.css',
  templateUrl: './user-login.html',
})
export class UserLogin {

  applyForm = new FormGroup({
      username: new FormControl(''),
    });


    authService = inject(AuthService);
    router = inject(Router);





    constructor() {

    }





  submitForm() {
    let name = this.applyForm.value.username ?? '';
    this.authService.setUsername(name);
    console.log(name);
    this.router.navigate(['/home']);
  }





}
