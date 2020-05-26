import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router) { }

  public search : string;

  ngOnInit() {
  }

  onLogOut(){
  	if(localStorage.getItem('admin'))
  	{
  		localStorage.removeItem('admin');
  		this.router.navigateByUrl("/");
  	}
  }
  
  onSearch(){
    console.log(this.search);
    this.router.navigateByUrl('/search/' + this.search);
  }

}
