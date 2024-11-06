import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ApiService} from '../api.service';
import {NgIf} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

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

export class LoginComponent implements OnInit {

  constructor(private router: Router, private currentRoute: ActivatedRoute) {
  }

  redirectUrl: string | null = null;
  errorMsg: string | null = null;
  apiService = inject(ApiService);

  ngOnInit() {
    this.redirectUrl = this.currentRoute.snapshot.queryParamMap.get('redirectUrl');
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  loginSubmit() {
    if (this.loginForm.valid) {
      this.apiService.login(
        this.loginForm.value.email ?? "",
        this.loginForm.value.password ?? "",
      ).subscribe({
        next: (response) => {
          const navigateTo = this.redirectUrl ? this.redirectUrl : '/home';
          console.log(response)
          localStorage.setItem('token', response.token);
          this.router.navigateByUrl(navigateTo).then(success => {
            if (success) {
              console.log("Success");
            } else {
              console.log("Failed");
            }
          }).catch(error => {
            console.log("Error", error);
          })
          ;
        },
        error: (error) => {
          if (error.status === 401) {
            this.errorMsg = "Invalid Credentials - Please Retry";
          }
        },
        complete: () => {
          console.log('login complete');
        }
      })
    } else {
      this.errorMsg = "Please fill out all fields correctly.";
    }
  }
}
