import { ProductsService } from './../Services/products.service';
import { Product } from './product.model';
import { Cart } from './cart.model';


export class Cart_Product{
	public id: number;
	public amount : number;
	public bill_id: number;
	public product: Product;
	public total: number;


}