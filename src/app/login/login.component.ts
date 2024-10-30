import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  constructor(private router: Router) {
  }

  apiService = inject(ApiService);

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  loginSubmit() {
    this.apiService.login(
      this.loginForm.value.email ?? "",
      this.loginForm.value.password ?? "",
    ).subscribe(response => {
      localStorage.setItem('token', response.token);
      this.router.navigate(['/home']);
    })
  }

}
