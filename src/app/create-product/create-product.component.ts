import { Component } from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    NavbarComponent,
    ReactiveFormsModule
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {

  constructor(private apiService: ApiService, private router: Router) { }

  createForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
  });

  submitCreate() {
    this.apiService.createProduct(
      this.createForm.value.name ?? "",
      this.createForm.value.description ?? "",
      this.createForm.value.price ?? "",
    ).subscribe(response => {
      console.log(response);
      this.router.navigate(['/home']);
    })
  }

}
