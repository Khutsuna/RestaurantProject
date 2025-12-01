import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';
import { RestaurantService } from '../services/restaurant.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  categories$: Observable<Category[]>;
  products$: Observable<Product[]>;
  
  selectedCategoryId: number | null = null;
  filterNuts: boolean | undefined = undefined;
  filterVegetarian: boolean | undefined = undefined;
  filterSpiciness: number = -1;

  constructor(
    private restaurantService: RestaurantService,
    private cartService: CartService
  ) {
    this.categories$ = this.restaurantService.getCategories();
    this.products$ = this.restaurantService.getAllProducts();
  }

  selectCategory(categoryId: number | null): void {
    this.selectedCategoryId = categoryId;
  }

  applyFilters(): void {
    // Always get all products and filter client-side
    this.products$ = this.restaurantService.getAllProducts();
  }

  clearFilters(): void {
    this.filterNuts = undefined;
    this.filterVegetarian = undefined;
    this.filterSpiciness = -1;
    this.products$ = this.restaurantService.getAllProducts();
  }

  filterProductsByCategory(products: Product[]): Product[] {
    let filtered = products;

    // Category filter
    if (this.selectedCategoryId !== null) {
      filtered = filtered.filter(p => p.categoryId === this.selectedCategoryId);
    }

    // Vegetarian filter
    if (this.filterVegetarian === true) {
      filtered = filtered.filter(p => p.vegeterian === true);
    }

    // Nuts filter
    if (this.filterNuts === true) {
      filtered = filtered.filter(p => p.nuts === true);
    }

    // Spiciness filter
    if (this.filterSpiciness !== -1) {
      filtered = filtered.filter(p => p.spiciness === this.filterSpiciness);
    }

    return filtered;
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
