import { Component } from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    NavbarComponent,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {

  constructor(private apiService: ApiService, private router: Router) { }

  createForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });

  errorMsg: string | null = null;

  submitCreate() {
    this.apiService.createProduct(
      this.createForm.value.name ?? "",
      this.createForm.value.description ?? "",
      this.createForm.value.price ?? "",
    ).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/home']).then(success => {
          if (success) {
            console.log("Success");
          } else {
            console.log("Error");
          }
        }).catch(error => {
          console.log(error);
        });
      },
      error: (error) => {
        this.errorMsg = error.message;
      },
      complete: () => {
        console.log("Complete")
      }
    })
  }

}
