import { ProductsService } from './../Services/products.service';
import { Product } from './product.model';

export class Cart{
	public id: number;
	public amount : number;
	public bill_id: number;
	public product_id: number;
	public total: number;
}