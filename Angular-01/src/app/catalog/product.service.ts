import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService
{
  private _nUserID: number = 1; // DJS: Hardcoded for now, but will need to be dynamic later.

  constructor(private http: HttpClient) { }
  
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('api/RobotCatalog');
  }
}
