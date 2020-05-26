import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartsService } from './../../Services/carts.service';
import { Subscription } from 'rxjs';
import { Cart } from './../../Models/cart.model';
import {
  SortPipe
} from './../../pipes/sort.pipe';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Cart_Product } from './../../Models/cart_product.model';
import { Product } from './../../Models/product.model';
import { ProductsService } from './../../Services/products.service';


@Component({
  selector: 'app-admin-cart-by-bill',
  templateUrl: './admin-cart-by-bill.component.html',
  styleUrls: ['./admin-cart-by-bill.component.css']
})
export class AdminCartByBillComponent implements OnInit, OnDestroy {

  public subscription : Subscription;
  public subscriptionParams : Subscription;
  public cart_product : Cart_Product[] = [];

  public carts : Cart[] = null ;

  public sortBy: string = 'name';
  public sortValue: number = 1; // 1 là tăng, -1 là giảm
  public billId : number;

  constructor(public cartsService: CartsService, public routerService: Router,
    public activatedRoute : ActivatedRoute, public productsService: ProductsService) { }

  ngOnInit() {
  	this.subscriptionParams =  this.activatedRoute.params.subscribe((data: Params) =>{
      this.billId = data['id'];
      this.subscription = this.cartsService.getAllCartsByBillId(data['id']).subscribe((data : Cart[]) => {
        console.log("data");
        console.log(data);
        this.carts = data;
        this.setCartProduct(this.carts);

      });
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
        console.log(this.cart_product[i].product);
      }
    }
  }

  onSort(col){
    this.sortBy = col;
    this.sortValue = -this.sortValue;
  }

  ngOnDestroy(){
  	if(this.subscription){
  		this.subscription.unsubscribe();
  	}
  }

  onDeleteCart(id: number){
    this.subscription = this.cartsService.deleteCart(id).subscribe((data : Cart) => {
          this.updateData(id);
    });

  }

  updateData(id: number){
    console.log("vào update");
    for (var i = 0; i < this.carts.length; ++i) {
      if(this.carts[i].id == id)
      {
        this.carts.splice(i, 1);
        this.cart_product.splice(i, 1);
        break;
      }
    }
  }

}
