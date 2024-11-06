
import { CartService } from '../cart/cart.service';
export interface IProduct
{
    productID: number;
    description: string;
    name: string;
    imageName: string;
    categoryName: string;
    price: number;
    discount: number;
}

export interface ICartItemInsert
{
  UserID: number;
  ProductID: number;
}
