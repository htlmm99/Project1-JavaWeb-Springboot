import { Component, OnInit, OnDestroy } from '@angular/core';
import { BillsService } from './../../Services/bill.service';
import { Subscription } from 'rxjs';
import { Bill } from './../../Models/bill.model';
import {
  SortPipe
} from './../../pipes/sort.pipe';

@Component({
  selector: 'app-admin-bill',
  templateUrl: './admin-bill.component.html',
  styleUrls: ['./admin-bill.component.css']
})
export class AdminBillComponent implements OnInit, OnDestroy {

public subscription : Subscription;
	public bills : Bill[] = null ;
  public sortBy: string = 'name';
  public sortValue: number = 1; // 1 là tăng, -1 là giảm

  constructor(public billsService: BillsService) { }

  ngOnInit() {
  	this.billsService.getAllBills().then((data : Bill[]) => {
  		console.log("data");
  		console.log(data);
  		this.bills = data;
  		console.log(this.bills);
  	});
  	console.log(this.bills);
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

  onDeleteBill(id: number){
    this.subscription = this.billsService.deleteBill(id).subscribe((data : Bill) => {
      this.updateData(id);
    });
  }

  updateData(id: number){
    for (var i = 0; i < this.bills.length; ++i) {
      if(this.bills[i].id == id)
      {
          this.bills.splice(i, 1);
          break;
      }
    }
  }

}
