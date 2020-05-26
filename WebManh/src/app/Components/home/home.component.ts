import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from './../../Services/products.service';
import { CartsService } from './../../Services/carts.service';

import { Subscription } from 'rxjs';
import { Product } from './../../Models/product.model';
import { Cart } from './../../Models/cart.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  public subscription : Subscription;
  public products : Product[] = null ;
  public cart : Cart;


  constructor(public productsService: ProductsService, public cartsService: CartsService) { }

  ngOnInit() {
  	this.productsService.getAllProducts().then((data : Product[]) => {
  		this.products = data;
      console.log(data);
      console.log(this.products);
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

  
  ngOnDestroy(){
  	if(this.subscription){
  		this.subscription.unsubscribe();
  	}
  }
}
