import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Bill } from './../../Models/bill.model';
import { BillsService } from './../../Services/bill.service';
import { Product } from './../../Models/product.model';
import { ProductsService } from './../../Services/products.service';
import { CartsService } from './../../Services/carts.service';
import { Subscription } from 'rxjs';
import { Cart } from './../../Models/cart.model';
import { Router} from '@angular/router';
import { Cart_Product } from './../../Models/cart_product.model';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

	public formData : FormGroup;
	public bill: Bill = null;
	public subscription : Subscription;
  public thanhcong = false;
  public cart_product : Cart_Product[] = [];



  public carts : Cart[] = null ;
  public cart: Cart;
  public ship: number = 30000;
  public subTotal: number = 0;
  public product: Product;

  constructor(public cartsService: CartsService, 
    public productsService: ProductsService,
    public billsService: BillsService,
    public routerService: Router) { }

  ngOnInit() {
  	this.formData = new FormGroup({
  		fullName: new FormControl("",Validators.compose([
        Validators.required,
        //Validators.minLength(5),
        Validators.maxLength(50)
        ])),
      email : new FormControl("",Validators.compose([
        Validators.required
        ])),
      phone : new FormControl("",Validators.compose([
        Validators.required
        ])),
      city : new FormControl("",Validators.compose([
        Validators.required
        ])),
      town : new FormControl("",Validators.compose([
        Validators.required
        ])),
      address : new FormControl("",Validators.compose([
        Validators.required
        ])),
      note : new FormControl("")
    });

  	this.subscription = this.cartsService.getAllCartsByBillId(-1).subscribe((data : Cart[]) => {
      this.carts = data;
      this.setCartProduct(this.carts);
      this.subTotal = this.setSubTotal(this.carts);
    });
    console.log(this.carts);
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

  setSubTotal(carts: Cart[]){ //tạo tổng tiền
    console.log(this.carts);
    if(this.carts != null){
      for(var i = 0; i < carts.length; ++i)
      {
        this.subTotal += carts[i].total;
      }
    }
    return this.subTotal;
  }

  	/*getProduct(cart: Cart){
		this.product = new Product;
		this.productsService.getOneProduct(cart.product_id).subscribe((data : Product) => {
			this.product = data;
			console.log(this.product);
		});
		return this.product;
	}*/

  onClickSubmit(data){
    this.bill = new Bill();
    this.bill.fullName = data.fullName;
    this.bill.phone = data.phone;
    this.bill.email = data.email;
    this.bill.addess = data.address + " " + data.town + " " + data.city;
    this.bill.note = data.note;
    this.bill.total = 0;
    console.log(this.bill);
    this.thanhcong = true;

  }

  onBill(){
    console.log(this.bill);
    if(this.carts.length == 0){
      alert("Giỏ hàng chưa có gì. Mời bạn mua sắm");
      this.routerService.navigateByUrl('/');
    }
    else{
      if(this.bill == null){ //chưa nhập mẫu
        alert("Mời bạn nhập thông tin cá nhân");
      }
      else{
        let x = confirm("Bạn xác nhận đặt hàng ???")
        if(x == true){
          this.bill.total = this.subTotal + this.ship;
          console.log(this.bill);
          this.subscription = this.billsService.addBill(this.bill).subscribe((data: Bill) =>{
            if(data && data.id){
              alert("Đặt hàng thành công");
              this.loadData(data.id);
              this.routerService.navigateByUrl('/');
            }
        });
        }
        else{
          alert("Mời bạn tiếp tục mua sắm");
        }
      }
    }
  }


  loadData(id: number){
    console.log(this.carts);
    for (var i = 0; i < this.carts.length; ++i) {
      {
        this.carts[i].bill_id = id;
        this.cart_product[i].bill_id = id;
        this.subscription = this.cartsService.editCart(this.carts[i]).subscribe(data =>{
          console.log(data);
        });
      }
    }
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
