import { Component, OnInit } from '@angular/core';
import { IProduct } from '../catalog/product.model';
import { CartService } from './cart.service';

@Component({
  selector: 'bot-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  private cart: IProduct[] = [];
  constructor(private cartService: CartService) { }

  // This function is called when the component is initialized.
  ngOnInit()
  {
    // This function subscribes to the cart service to get the cart.
    this.cartService.getCart().subscribe({
      next:(cart) => this.cart = cart,
    });
  }

  get cartItems() {
    return this.cart;
  }

  // This function returns the total price of the cart.
  get cartTotal() {
    return this.cart.reduce((prev, next) => {
      let discount = next.discount && next.discount > 0 ? 1 - next.discount : 1;
      return prev + next.price * discount;
    }, 0);
  }

  // This function removes a product from the cart.
  removeFromCart(product: IProduct) {
    this.cartService.remove(product);
  }

  getImageUrl(product: IProduct) {
    if (!product) return '';
    return '/assets/images/robot-parts/' + product.imageName
  }
}
