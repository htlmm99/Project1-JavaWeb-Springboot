import {RouterModule, Routes} from '@angular/router';
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
import { MenProductComponent } from './Components/men-product/men-product.component';
import { CartComponent } from './Components/cart/cart.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { WomenProductComponent } from './Components/women-product/women-product.component';
import { AccessoriesProductComponent } from './Components/accessories-product/accessories-product.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { AuthGuard } from './Services/auth.guard';
import { AdminBillComponent } from './Components/admin-bill/admin-bill.component';
import { AdminCartByBillComponent } from './Components/admin-cart-by-bill/admin-cart-by-bill.component';
import { SearchComponent } from './Components/search/search.component';

export const appRoutes : Routes = [
{
	path: '',
	redirectTo: '/home',
	pathMatch: 'full'
},
{
	path: 'home',
	component: HomeComponent
	
},
{
	path: 'about',
	component: AboutComponent
},
{
	path: 'contact',
	component: ContactComponent
},
{
	path: 'productmen',
	component: MenProductComponent
},
{
	path: 'productwomen',
	component: WomenProductComponent
},
{
	path: 'productaccessories',
	component: AccessoriesProductComponent
},
{
	path: 'product/:id',
	component: ProductsComponent
},
{
	path: 'search/:key',
	component: SearchComponent
},
{
	path: 'cart',
	component: CartComponent
},
{
	path: 'checkout',
	component: CheckoutComponent
},
{
	path: 'login',
	component: LoginComponent
},
{
	path: 'register',
	component: RegisterComponent
},
{
	path: 'admin',
	canActivate: [AuthGuard],
	component: AdminComponent,
},
{
	path: 'bill',
	canActivate: [AuthGuard],
	component: AdminBillComponent,
},
{
	path: 'admin/:id/show',
	canActivate: [AuthGuard],
	component: AdminCartByBillComponent
},
{
	path: 'admin/productsadd',
	canActivate: [AuthGuard],
	component: ProductAddComponent
},
{
	path: 'admin/:id/edit',
	canActivate: [AuthGuard],
	component: ProductEditComponent
},
{
	path: '**',
	component: NotFoundComponent
}
];