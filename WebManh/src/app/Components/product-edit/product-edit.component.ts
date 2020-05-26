import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from './../../Models/product.model';
import { ProductsService } from './../../Services/products.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, OnDestroy {

  public product : Product ;
	public subscription : Subscription;
  public subscriptionParams : Subscription;


  constructor(
  	public productsService: ProductsService,
  	public routerService: Router,
    public activatedRoute : ActivatedRoute,
  	) { }

  ngOnInit() {

  	this.product = new Product();
    this.loadData();

  }

  loadData(){
    this.subscriptionParams =  this.activatedRoute.params.subscribe((data: Params) =>{
      console.log(data);
      this.productsService.getOneProduct(data['id']).then((product: Product)=>{
          this.product = product;
      }) ;

    });
  }

  onEditProduct(){
  		this.subscription = this.productsService.editProduct(this.product).subscribe((data : Product) => {
  				this.routerService.navigateByUrl('admin');

  	})
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