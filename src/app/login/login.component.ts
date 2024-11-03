import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ApiService} from '../api.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  constructor(private router: Router) {
  }

  errorMsg: string | null = null;

  apiService = inject(ApiService);

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  loginSubmit() {
    this.apiService.login(
      this.loginForm.value.email ?? "",
      this.loginForm.value.password ?? "",
    ).subscribe(
      (response) => {
        console.log(response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      (error) => {
        if (error.status === 401) {
          this.errorMsg = "Invalid Credentials - Please Try Again";
          console.log(this.errorMsg);
        }
      }
    )
  }

}
