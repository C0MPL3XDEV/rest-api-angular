import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent implements OnInit {

  constructor(private apiService: ApiService) {
  }

  products: [] = [];

  ngOnInit() {
    this.apiService.getAllProducts().subscribe(response => {
      this.products = response;
      console.log(this.products);
    })
  }
}
