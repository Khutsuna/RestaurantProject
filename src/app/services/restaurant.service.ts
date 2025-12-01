import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private readonly baseUrl = 'https://restaurant.stepprojects.ge/api';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/Categories/GetAll`);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/Products/GetAll`);
  }

  getFilteredProducts(containsNuts?: boolean, isVegetarian?: boolean): Observable<Product[]> {
    let params = new HttpParams();
    
    if (containsNuts !== undefined) {
      params = params.set('containsNuts', containsNuts.toString());
    }
    
    if (isVegetarian !== undefined) {
      params = params.set('isVegetarian', isVegetarian.toString());
    }

    return this.http.get<Product[]>(`${this.baseUrl}/Products/GetFiltered`, { params });
  }
}
