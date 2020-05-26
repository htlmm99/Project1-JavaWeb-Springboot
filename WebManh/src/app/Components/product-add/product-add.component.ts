import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from './../../Models/product.model';
import { ProductsService } from './../../Services/products.service';
import { Subscription } from 'rxjs';
import { Router} from '@angular/router';



@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit, OnDestroy {

		public product : Product ;
		public subscription : Subscription;


  constructor(
  	public productsService: ProductsService,
  	public routerService: Router

  	) { }

  ngOnInit() {

  	this.product = new Product();
  }

  onAddProduct(){
  		this.subscription = this.productsService.addProduct(this.product).subscribe((data : Product) => {
  			if(data && data.id){
  				this.routerService.navigate(['admin']);
  			}

  	})
  }
  ngOnDestroy(){
  	if(this.subscription){
  		this.subscription.unsubscribe();
  	}

  }

}
