import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { ApiService } from '../api.service';
import { Products } from '../products';
import {NavbarComponent} from '../navbar/navbar.component';
import {NgIf} from '@angular/common';
import {NotFoundComponent} from '../not-found/not-found.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    NavbarComponent,
    NgIf,
    NotFoundComponent,
    RouterLink
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  constructor(private apiService: ApiService) {
  }

  product: Products | undefined;
  errorMsg: string | null = null;

  route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    const productId = this.route.snapshot.params['id'];
    this.apiService.getProductById(Number(productId)).subscribe({
      next: (response) => {
        this.product = response.data;
      },
      error: (error) => {
        if (error.status === 404) {
          this.errorMsg = "Product Not Found";
        } else {
          this.errorMsg = error.message;
        }
      },
      complete: () => {
        console.log("Completed")
      }
    })
  }
}
