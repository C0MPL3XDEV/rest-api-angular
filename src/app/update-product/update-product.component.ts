import {Component, inject, OnInit} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {ApiService} from '../api.service';
import {RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Products} from '../products';
import {ActivatedRoute, Router} from '@angular/router';
import {NotFoundComponent} from '../not-found/not-found.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink,
    ReactiveFormsModule,
    NotFoundComponent,
    NgIf
  ],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit {

  constructor(private apiService: ApiService , private router: Router) {}

  product: Products | undefined;
  errorMsg: string | null = null;

  route: ActivatedRoute = inject(ActivatedRoute);

  updateForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    const productId = this.route.snapshot.params['id'];

    this.apiService.getProductById(Number(productId)).subscribe({
      next: (response) => {
        this.product = response.data;
        if (this.product) {
          this.updateForm.patchValue({
            name: this.product.name,
            description: this.product.description,
            price: this.product.price,
          })
        }
      },
      error: (error) => {
        if (error.status === 404) {
          this.errorMsg = "Product Not Found!";
        } else {
          this.errorMsg = error.message;
        }
      },
      complete: () => {
        console.log("Completed");
      }
    })
  }


  sendUpdate() {
    const id = this.route.snapshot.params['id'];

    if (this.updateForm.invalid) {
      this.apiService.editProduct(
        Number(id),
        this.updateForm.value.name ?? "",
        this.updateForm.value.description ?? "",
        this.updateForm.value.price ?? "",
      ).subscribe({
        next: () => {
          this.router.navigate(['/home']).then(success => {
            if (success) {
              console.log("Redirect Successfully")
            } else {
              console.log("Failed")
            }
          }).catch(error => {
            console.log("Error", error);
          });
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log("Completed");
        }
      })
    } else {
      this.errorMsg = "Please fill out all fields correctly.";
    }
  }
}
