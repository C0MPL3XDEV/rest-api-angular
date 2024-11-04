import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
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

  ngOnInit() {
    this.redirectUrl = this.currentRoute.snapshot.queryParamMap.get('redirectUrl');
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
    ).subscribe(
      (response) => {
        const navigateTo = this.redirectUrl ? this.redirectUrl : '/home';
        console.log(response);
        localStorage.setItem('token', response.token);
        this.router.navigateByUrl(navigateTo);
      },
        (error) => {
          if (error.status === 401) {
            this.errorMsg = "Invalid Credentials - Please Retry"
          }
        }
      )
  }

}
