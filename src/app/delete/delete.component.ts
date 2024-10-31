import {Component, inject, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {Products} from '../products';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [
    NavbarComponent,
  ],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) {}

  product: Products | undefined;

  route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.apiService.getProductById(Number(id)).subscribe(response => {
      this.product = response.data;
    });
  }

  submitDelete() {
    const id = this.route.snapshot.params['id'];
    this.apiService.deleteProduct(Number(id)).subscribe(response => {
      console.log(response);
      this.router.navigate(['/home']);
    })
  }

}
