import {Component, inject, OnInit} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {ApiService} from '../api.service';
import {RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Products} from '../products';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit {

  constructor(private apiService: ApiService , private router: Router) {}

  product: Products | undefined;

  route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.apiService.getProductById(Number(id)).subscribe(response => {
      this.product = response.data;
      if (this.product) {
        this.updateForm.patchValue({
          name: this.product.name,
          description: this.product.description,
          price: this.product.price
        })
      }
      console.log(this.product);
    });
  }

  updateForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
  })

  sendUpdate() {
    const id = this.route.snapshot.params['id'];
    this.apiService.editProduct(
      Number(id),
      this.updateForm.value.name ?? "",
      this.updateForm.value.description ?? "",
      this.updateForm.value.price ?? "",
    ).subscribe(response => {
      this.router.navigate(['/home']);
      console.log(response);
    });
  }
}
