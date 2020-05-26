import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from './../../Models/product.model';
import { ProductsService } from './../../Services/products.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { CartsService } from './../../Services/carts.service';
import { Cart } from './../../Models/cart.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

	public product : Product ;
  public cart : Cart;
  public subscription : Subscription;
  public subscriptionParams : Subscription;
  public amount: number = 1;

  constructor(
  	public productsService: ProductsService,
  	public cartsService: CartsService,
  	public routerService: Router,
    public activatedRoute : ActivatedRoute,
    ) { }

  ngOnInit() {
  	this.product = new Product();
    this.loadData();
    this.cart = new Cart();
  }

  loadData(){
    this.subscriptionParams =  this.activatedRoute.params.subscribe((data: Params) =>{
      this.productsService.getOneProduct(data['id']).then((product: Product)=>{
        this.product = product;
      }) ;
    });
  }
  
  onMinus(){
  	console.log(this.amount);
  	if(this.amount > 1){
  		this.amount -= 1;
  	}
  }

  onPlus(){
  	if(this.amount < this.product.amount)
  	{
  		this.amount += 1;
  	}
  }

  onAddCart(){
    this.cart.product_id = this.product.id;
    this.cart.amount = this.amount;
    this.cart.total = this.amount * this.product.price;
    this.cart.bill_id = -1;
    this.cartsService.addCart(this.cart).then((data: Cart)=>{
      console.log(data);
    });
    console.log(this.cart);
  }

  ngOnDestroy(){
  	if(this.subscription){
  		this.subscription.unsubscribe();
  	}
    if(this.subscriptionParams){
      this.subscriptionParams.unsubscribe();
    }

  }

}
