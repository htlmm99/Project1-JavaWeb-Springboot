import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { CartsService } from './../../Services/carts.service';
import { Subscription } from 'rxjs';
import { Cart } from './../../Models/cart.model';
import { Cart_Product } from './../../Models/cart_product.model';

import { Product } from './../../Models/product.model';
import { ProductsService } from './../../Services/products.service';
import {Observable} from 'rxjs';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

	public subscription : Subscription;
	public carts : Cart[] = [] ;
	public cart_product : Cart_Product[] = [];
	public cart: Cart;
	public ship: number = 30000;
	public subTotal: number = 0;
	public product: Product;

	constructor(public cartsService: CartsService, 
		public productsService: ProductsService)
	{}

	ngOnInit() {
		this.subscription =  this.cartsService.getAllCartsByBillId(-1).subscribe((data : Cart[]) => {
			console.log(data + "1");
			this.carts = data;
			console.log("đây là carts");
			console.log(this.carts);
			this.setCartProduct(this.carts);
			console.log("đây là cart_product");
			console.log(this.cart_product);
			this.subTotal = this.setSubTotal(this.cart_product);

		});
	}

	setCartProduct(carts: Cart[]){ // tạo mảng cart_product để hiển thị
		if(carts != null){
			for (var i = 0; i < carts.length; ++i) {
				let item = new Cart_Product();
				item.id = carts[i].id;
				item.amount = carts[i].amount;
				item.total = carts[i].total;
				this.productsService.getOneProduct(carts[i].product_id).then((product: Product)=>{
					item.product = product;
				}) ;
				this.cart_product.push(item);
			}
		}
	}

	setSubTotal(carts: Cart_Product[]){ //tạo tổng tiền
		console.log(this.carts);
		this.subTotal = 0;
		if(this.carts != null){
			for(var i = 0; i < carts.length; ++i)
			{
				this.subTotal += carts[i].total;
			}
		}
		return this.subTotal;
	}

	onMinus(item: Cart_Product, i: number){ //giảm số lượng mua, kiểm tra > 1
		if(item.amount > 1){
			item.amount -= 1;
			this.cart_product[i].amount = item.amount;
			this.carts[i].amount = item.amount;
			this.subscription = this.cartsService.editCart(this.carts[i]).subscribe((data: Cart) =>{
				this.carts[i].total = data.total;
				this.cart_product[i].total = data.total;
				this.setSubTotal(this.cart_product);
			});
		}
	}

	onPlus(item: Cart_Product, i: number){
		if(item.amount < item.product.amount){
			item.amount += 1;
			this.cart_product[i].amount = item.amount;
			this.carts[i].amount = item.amount;
			this.subscription = this.cartsService.editCart(this.carts[i]).subscribe((data: Cart) =>{
				this.carts[i].total = data.total;
				this.cart_product[i].total = data.total;
				this.setSubTotal(this.cart_product);
			});
		}
	}

	onDeleteCart(id: number){
		this.subscription = this.cartsService.deleteCart(id).subscribe((data: Cart) => {
			this.updateData(id);
		})

	}
	updateData(id: number){
		for (var i = 0; i < this.carts.length; ++i) {
			if(this.carts[i].id == id)
			{
				this.carts.splice(i, 1);
				this.cart_product.splice(i, 1);
				break;
			}
		}
	}

	ngOnDestroy(){
		if(this.subscription){
			this.subscription.unsubscribe();
		}
	}



}