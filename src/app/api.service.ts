import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor() { }

  httpClient = inject(HttpClient);
  apiUrl = 'http://127.0.0.1:8000/api/';

  login(email: string, password: string): Observable<any> {
    return this.httpClient.post(this.apiUrl + 'login', {email, password});
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.httpClient.post(this.apiUrl + 'register', {name, email, password});
  }

  getAllProducts(): Observable<any> {
    return this.httpClient.get(this.apiUrl + 'products');
  }

  getProductById(id: number): Observable<any> {
    return this.httpClient.get(this.apiUrl + 'products/' + id);
  }

  editProduct(id: number, name: string, description: string, price: string): Observable<any> {
    return this.httpClient.put(this.apiUrl + 'products/' + id, {name, description, price});
  }

  deleteProduct(id: number): Observable<any> {
    return this.httpClient.delete(this.apiUrl + 'products/' + id);
  }

  createProduct(name: string, description: string, price: string): Observable<any> {
    return this.httpClient.post(this.apiUrl + 'products', {name, description, price});
  }

  logout(): Observable<any> {
    return this.httpClient.post(this.apiUrl + 'logout', null);
  }
}
