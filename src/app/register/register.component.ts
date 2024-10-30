import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private apiService: ApiService, private router: Router) {}

  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })

  registerSubmit() {
    this.apiService.register(
      this.registerForm.value.name ?? "",
      this.registerForm.value.email ?? "",
      this.registerForm.value.password ?? "",
    ).subscribe(response => {
      localStorage.setItem('token', response.token);
      this.router.navigate(['/home']);
    })
  }


}
