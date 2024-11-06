import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {NgForOf, NgIf} from '@angular/common';
import {Products} from '../products';
import {RouterLink} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar.component';
import {Profiles} from '../profiles';

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

  constructor(private apiService: ApiService) { }

  products: Products [] = [];
  userData: {message: string, user: Profiles} | undefined;
  errorMsg: string | null = null;

  ngOnInit() {
    this.apiService.getProfile().subscribe({
      next: (response) => {
        this.userData= response;
      },
      error: (error) => {
        this.errorMsg = error.message;
      },
      complete: () => {
        console.log('completed')
      }
    })
    this.apiService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        console.log("Products Fetched");
      },
      error: (error) => {
        console.log(error.message);
      },
      complete: () => {
        console.log("Completed");
      }
    })
  }
}
