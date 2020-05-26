import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from './../../Services/products.service';
import { CartsService } from './../../Services/carts.service';
import { Subscription } from 'rxjs';
import { Product } from './../../Models/product.model';
import { OutProduct } from './../../Models/outputProduct.model';
import {
	SortPipe
} from './../../pipes/sort.pipe';
import { Cart } from './../../Models/cart.model';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router, ActivatedRoute, Params} from '@angular/router';


@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
	public subscription : Subscription;
	public subscriptionParams : Subscription;
	public products : Product[] = null ;
	public cart : Cart;
	public page: number = 1;
	public tu = 1;
	public sortBy: string = 'name';
	public sortValue: number = 1; // 1 là tăng, -1 là giảm
	public key: string;


	constructor(public productsService: ProductsService, public cartsService: CartsService, public routerService: Router,
		public activatedRoute : ActivatedRoute,) { }

	ngOnInit() {
		this.subscriptionParams =  this.activatedRoute.params.subscribe((data: Params) =>{
			console.log(data);
			this.key = data["key"];
			console.log(this.key);
			console.log(this.key);
			if(data != null){
				this.productsService.getProductsByName(this.key).then((data: Product[])=>{
					this.products = data;
					console.log(data);

				}) ;
			}
		});
		this.cart = new Cart();
	}
	
	onAddCart(product : Product){
		if(product.amount > 0){
			this.cart.product_id = product.id;
			this.cart.amount = 1;
			this.cart.total = product.price;
			this.cart.bill_id = -1;
			this.cartsService.addCart(this.cart).then((data: Cart)=>{
				console.log(data);
			});
		}
	}

	onSort(){
		console.log("sort");
		this.sortBy = this.sortBy;
		this.sortValue = -this.sortValue;
	}

	ngOnDestroy(){
		if(this.subscription){
			this.subscription.unsubscribe();
		}
	}

}
