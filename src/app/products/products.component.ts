import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {NgForOf, NgIf} from '@angular/common';
import {Products} from '../products';
import {RouterLink} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    NavbarComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent implements OnInit {

  constructor(private apiService: ApiService) {
  }

  products: Products [] = [];

  ngOnInit() {
    this.apiService.getAllProducts().subscribe(response => {
      this.products = response.data;
      console.log(this.products);
    })
  }
}
