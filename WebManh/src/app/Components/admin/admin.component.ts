import { Component, OnInit } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
//Routes
import {
  appRoutes
} from './../../app.routes';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  ariaSelected = true;
  onSelect(){
  	this.ariaSelected = !this.ariaSelected;
  }

}

