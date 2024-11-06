import { Component, inject } from '@angular/core';
import { IProduct } from './product.model';
import { CartService } from '../cart/cart.service';
import { ProductService } from './product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bot-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  products: IProduct[] | undefined;
  filter: string = '';
  private _cartSvc: CartService = inject(CartService);


  constructor(
    private cartSvc: CartService,
    private productSvc: ProductService,
    private router: Router
  )
  {
    
  }

  // Here's our "lifecycle" method. This is a method that Angular will call when the component is created.
  ngOnInit() {
    this.productSvc.getProducts().subscribe((products) =>
    {
      this.products = products;
      // Now that we have the products, we can log them to the console.
      // this is just DJS' own request.
      if (this.products.length > 0)
      {
        for (let product of this.products)
        {
          console.log(product);
        }
      }
    });
  }
  
   
  addToCart(product: IProduct)
  {
    this.cartSvc.add(product);
    /* DJS; the following code does not do the whole job by itself;
    apparently it does navigate us to another place, but it *not*
    sufficient in itself; it needs to have the page refreshed after
    navigating.  This may be something to be fixed.
    */  
    this.router.navigate(['/cart']);
  }

  getDiscountedClasses(product: IProduct)
  {
    if (product.discount > 0)
    {
      return ['strikethrough'];
    }
    else
    {
      return [''];
    }
  } 


  getFilteredProducts()
  {
    return this.filter === ''
      ? this.products
      : this.products?.filter((product: IProduct) => product.categoryName === this.filter)
  }
}
