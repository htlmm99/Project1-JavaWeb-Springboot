import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Cart } from './../Models/cart.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  public API : string = 'http://localhost:8032/cart';

  constructor(
    public http : HttpClient
    ) { }

  getAllCarts(){
  	return this.http.get(this.API);
  }

  getAllCartsByBillId(id : number){
    return this.http.get(`${this.API}/${id}`);
  }

  editCart(cart: Cart ){
    return this.http.put(`${this.API}/${cart.id}`, cart);
  }

  addCart(cart: Cart){
    console.log("đã add");
    return this.http.post(this.API, cart).toPromise();
  }

  deleteCart(id: number){
    return this.http.delete(`${this.API}/${id}`);
  }
}