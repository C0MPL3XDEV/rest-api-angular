import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private apiService: ApiService, private router: Router) {}

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })

  errorMsg: string | null = null;

  registerSubmit() {
    if (this.registerForm.valid) {
      this.apiService.register(
        this.registerForm.value.name ?? "",
        this.registerForm.value.email ?? "",
        this.registerForm.value.password ?? "",
      ).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          console.log(response);
          this.router.navigate(['/home']).then(success => {
            if (success) {
              console.log("Success");
            } else {
              console.log("Error to navigate");
            }
          }).catch(error => {
            console.log(error);
          });
        },
        error: (error) => {
          this.errorMsg = error.message;
        },
        complete: () => {
          console.log("Completed")
        }
      })
    } else {
      this.errorMsg = "Please fill out all fields correctly."
    }
  }
}
