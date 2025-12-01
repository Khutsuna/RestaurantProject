import { Component, signal, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CartService } from './services/cart.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('RestaurantProject2');
  cartCount$: Observable<number>;
  headerVisible = false;
  isCartPage = false;

  constructor(private cartService: CartService, private router: Router) {
    this.cartCount$ = this.cartService.getCartCount();
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isCartPage = event.url === '/cart';
      this.updateHeaderVisibility();
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.updateHeaderVisibility();
  }

  private updateHeaderVisibility(): void {
    this.headerVisible = this.isCartPage || window.scrollY > 100;
  }
}
