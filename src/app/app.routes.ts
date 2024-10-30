import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProductsComponent} from './products/products.component';

export const routes: Routes = [
  { path: "login", component: LoginComponent, title: "Log-In Page"},
  { path: "register", component: RegisterComponent, title: "Register Page" },
  { path: "home", component: ProductsComponent, title: "Products Page"},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
