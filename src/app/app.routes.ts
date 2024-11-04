import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProductsComponent} from './products/products.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {UpdateProductComponent} from './update-product/update-product.component';
import {DeleteComponent} from './delete/delete.component';
import {CreateProductComponent} from './create-product/create-product.component';
import {LogoutComponent} from './logout/logout.component';
import {ProfileComponent} from './profile/profile.component';
import {authGuard} from './auth.guard';

export const routes: Routes = [
  { path: "login", component: LoginComponent, title: "Log-In Page"},
  { path: "register", component: RegisterComponent, title: "Register Page" },
  { path: "home", component: ProductsComponent, title: "Products Page", canActivate: [authGuard]},
  { path: "details/:id", component: ProductDetailsComponent, title: "Product Details", canActivate: [authGuard]},
  { path: "update/:id", component: UpdateProductComponent, title: "Update Product", canActivate: [authGuard]},
  { path: "delete/:id", component: DeleteComponent, title: "Delete Product", canActivate: [authGuard]},
  { path: "create", component: CreateProductComponent, title: "Create Product", canActivate: [authGuard]},
  { path: "logout", component: LogoutComponent, title: "Logout", canActivate: [authGuard]},
  { path: "profile", component: ProfileComponent, title: "Profile Information", canActivate: [authGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
