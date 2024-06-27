import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ProdcutsService } from 'src/app/products/products.service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  @Output() logged = new EventEmitter();
  
  //constructor(private productsService:ProdcutsService) {}
  constructor(private authService:AuthService) {}

  submit():void
  {
    console.log("LogoutComponent -> submit()");

    this.authService.logout();
    this.logged.emit(); 
  }
}