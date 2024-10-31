import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProductsComponent} from './products/products.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {UpdateProductComponent} from './update-product/update-product.component';
import {DeleteComponent} from './delete/delete.component';

export const routes: Routes = [
  { path: "login", component: LoginComponent, title: "Log-In Page"},
  { path: "register", component: RegisterComponent, title: "Register Page" },
  { path: "home", component: ProductsComponent, title: "Products Page"},
  { path: "details/:id", component: ProductDetailsComponent, title: "Product Details"},
  { path: "update/:id", component: UpdateProductComponent, title: "Update Product"},
  { path: "delete/:id", component: DeleteComponent, title: "Delete Product"},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
