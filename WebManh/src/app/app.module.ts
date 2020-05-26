import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {
 HttpClientModule
  } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
//components
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { HeaderComponent } from './Components/header/header.component';
import { AboutComponent } from './Components/about/about.component';
import { ContactComponent } from './Components/contact/contact.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { FooterComponent } from './Components/footer/footer.component';
import { AdminComponent } from './Components/admin/admin.component';
import { ProductsComponent } from './Components/products/products.component';
import { ProductAddComponent } from './Components/product-add/product-add.component';
import { ProductEditComponent } from './Components/product-edit/product-edit.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { LoginComponent } from './Components/login/login.component';
import { MenProductComponent } from './Components/men-product/men-product.component';
import { CartComponent } from './Components/cart/cart.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { WomenProductComponent } from './Components/women-product/women-product.component';
import { AccessoriesProductComponent } from './Components/accessories-product/accessories-product.component';
import { RegisterComponent } from './Components/register/register.component';
//Routes
import {
  appRoutes
} from './app.routes';

//service
import { ProductsService } from './Services/products.service';
import { CartsService } from './Services/carts.service';
import { BillsService } from './Services/bill.service';
import { AuthGuard } from './Services/auth.guard';
import { SortPipe } from './pipes/sort.pipe';
import { AdminMenComponent } from './Components/admin-men/admin-men.component';
import { AdminWomenComponent } from './Components/admin-women/admin-women.component';
import { AdminPkComponent } from './Components/admin-pk/admin-pk.component';
import { AdminBillComponent } from './Components/admin-bill/admin-bill.component';
import { AdminCartByBillComponent } from './Components/admin-cart-by-bill/admin-cart-by-bill.component';
import { SearchComponent } from './Components/search/search.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    ContactComponent,
    NotFoundComponent,
    HomeComponent,
    FooterComponent,
    AdminComponent,
    ProductsComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductListComponent,
    LoginComponent,
    MenProductComponent,
    CartComponent,
    CheckoutComponent,
    WomenProductComponent,
    AccessoriesProductComponent,
    RegisterComponent,
    SortPipe,
    AdminMenComponent,
    AdminWomenComponent,
    AdminPkComponent,
    AdminBillComponent,
    AdminCartByBillComponent,
    SearchComponent

    
  ],
  imports: [
    // HttpClient,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [
  ProductsService,
  CartsService,
  BillsService,
  AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
