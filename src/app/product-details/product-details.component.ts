import {Component, inject, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Products } from '../products';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    NavbarComponent,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  constructor(private apiService: ApiService) {
  }

  product: Products | undefined;

  route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.apiService.getProductById(Number(this.route.snapshot.params['id'])).subscribe(response => {
      this.product = response.data;
      console.log(this.product);
    })
  }

}
