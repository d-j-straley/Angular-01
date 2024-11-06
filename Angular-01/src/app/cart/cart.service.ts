import { Injectable } from '@angular/core';
import { IProduct } from '../catalog/product.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CartService
{
  // This is the cart. It's an array of IProduct objects.
  //cart: IProduct[] = [];
  private cart: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);
  private _nUserID:number = 1; // DJS: Hardcoded for now, but will need to be dynamic later.


  // This function returns the cart.
  // This needs to be updated to include a UserID parameter, which we'll hardcode
  // for now, but will need to be updated to be dynamic later.
  // for now we'll hardcode the UserID as the server, but this will definitely
  // have to be updated later.
  constructor(private http: HttpClient)
  {
    //this.http.get<IProduct[]>('api/RobotCatalog').subscribe(
    this.http.get<IProduct[]>(`/api/Cart/ProductsInCart/${this._nUserID}` ).subscribe(
{
       next:(cart) => this.cart.next(cart),
    });
  }
  
  add(product: IProduct)
  {

    /* DJS: just push the individual product to the server, not the whole cart.
     * The API on the server is expecting only a singular product, not the whole cart.
     * Additionally, interestingly, if we do try to push the whole cart, the server will
     * reject it with a 400 Bad Request error, presumably because the server realizes
     * the we pushed and array of objects to it, not a singular object.  No problem,
     * any shopping cart should only add one item at a time, not the whole cart, to the
     * database.
     */

    //this.cart.push(product);

    let prod = {UserID: this._nUserID, ProductID: product.productID};
    //let url = '/api/Cart/' + this._nUserID + '/' + product.productID;
    this.http.post('api/Cart/', prod).subscribe((response) => {

    //this.http.post('/api/Cart/' + this._nUserID + '/' + product.productID).subscribe((response) => {

      //console.log('Added to cart: "' + product.name + '" with return code:' + response);
    })
  }

  getCart(): Observable<IProduct[]>
  {
    return this.cart.asObservable();
  }

  // This function removes a product from the cart.
  remove(product: IProduct)
  {
    let url = '/api/Cart/' + this._nUserID + '/' + product.productID;

    this.http.delete(url).subscribe((response) => {
      console.log('Removed from cart: "' + product.name + '" with return code:' + response);
    })
   }

}

