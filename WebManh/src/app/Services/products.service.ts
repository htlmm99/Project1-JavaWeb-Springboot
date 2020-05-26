import { Injectable } from '@angular/core';
import {
  HttpClient
  } from '@angular/common/http';
import {Observable} from 'rxjs';

 import { Product } from './../Models/product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

	public API : string = 'http://localhost:8032/product';
  public URL : string = 'http://localhost:8032/productType';
  public API1: string = 'http://localhost:8032/productSearch';

  constructor(
  		public http : HttpClient
  	) { }

  getProductsByType(type: string){
    type = this.cleanAccents(type);
    return this.http.get(`${this.URL}/${type}`).toPromise();
  }

  getAllProducts(){
  	return this.http.get(this.API).toPromise();
  }

  getOneProduct(id: number){
    return this.http.get(`${this.API}/${id}`).toPromise();
  }

  getProductsByName(name: string){
    name = this.cleanAccents(name);
    return this.http.get(`${this.API1}/${name}`).toPromise();
  }

  editProduct(product: Product ){
    return this.http.put(`${this.API}/${product.id}`, product);
  }

  addProduct(product: Product ){
    return this.http.post(this.API, product);
  }

  deleteProduct(id: number){
    return this.http.delete(`${this.API}/${id}`);
}

 cleanAccents = (str: string): string => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Combining Diacritical Marks
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // huyền, sắc, hỏi, ngã, nặng 
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // mũ â (ê), mũ ă, mũ ơ (ư)

    return str;
}
}