import { Injectable } from '@angular/core';
import {HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs/';


import { Bill } from './../Models/bill.model';
@Injectable({
  providedIn: 'root'
})
export class BillsService {

	public API : string = 'http://localhost:8032/bill';
  constructor(
    public http : HttpClient
    ) { }

  getAllBills(){
    console.log("da goi");
    return this.http.get(this.API).toPromise();
  }

  getOneBill(id: number){
    return this.http.get(`${this.API}/${id}`);
  }

  editBill(bill: Bill ){
    return this.http.put(`${this.API}/${bill.id}`, bill);
  }

  addBill(bill: Bill ){
    return this.http.post(this.API, bill);
  }

  deleteBill(id: number){
    return this.http.delete(`${this.API}/${id}`);
  }
}