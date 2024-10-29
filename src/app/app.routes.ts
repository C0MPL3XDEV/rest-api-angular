import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {RegisterComponent} from './register/register.component';

export const routes: Routes = [
  { path: "login", component: LoginComponent, title: "Log-In Page"},
  { path: "register", component: RegisterComponent, title: "Register Page" },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
