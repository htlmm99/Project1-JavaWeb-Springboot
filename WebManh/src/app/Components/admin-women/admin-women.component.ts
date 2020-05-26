import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from './../../Services/products.service';
import { Subscription } from 'rxjs';
import { Product } from './../../Models/product.model';
import {
  SortPipe
} from './../../pipes/sort.pipe';

@Component({
  selector: 'app-admin-women',
  templateUrl: './admin-women.component.html',
  styleUrls: ['./admin-women.component.css']
})
export class AdminWomenComponent implements OnInit, OnDestroy {

	public subscription : Subscription;
	public products : Product[] = null ;
  public sortBy: string = 'name';
  public sortValue: number = 1; // 1 là tăng, -1 là giảm

  constructor(public productsService: ProductsService) { }

  ngOnInit() {
  	this.productsService.getAllProducts().then((data : Product[]) => {
  		this.products = data;
  	});
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

  onDeleteProduct(id: number){
    this.subscription = this.productsService.deleteProduct(id).subscribe((data : Product) => {
      this.updateData(id);
    });
  }

  updateData(id: number){
    for (var i = 0; i < this.products.length; ++i) {
      if(this.products[i].id == id)
      {
          this.products.splice(i, 1);
          break;
      }
    }
  }

}
