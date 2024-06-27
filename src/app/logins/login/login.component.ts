import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
//import { NgForm } from '@angular/forms';
//import { AuthenticationService } from './logins/authentication.service';
import { ProdcutsService } from '../../products/products.service';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  //@ViewChild('loginForm') loginForm:NgForm | undefined;

  @Output() logged = new EventEmitter<boolean>();

  login$:Observable<{token:string}> | undefined;
  private loginSubscription:Subscription | undefined;

  userName:string = "Ciccio";
  password:string = "";
  //loginResult:string = "";
  //isLogged:boolean = false;

  //constructor(private authenticationService:AuthenticationService) {}
  //constructor(private productsService:ProdcutsService) {}
  constructor(private authService:AuthService) {}

  ngOnInit(): void {
    console.log("LoginComponent -> ngOnInit()");

    //this.loginResult = "";
  }
  
  ngOnDestroy(): void {
    console.log("LoginComponent -> ngOnDestroy()");

    this.loginSubscription?.unsubscribe();
  }

  submit():void
  {
    console.log("LoginComponent -> submit()");

    //console.log(this.loginForm);

    console.log("LoginComponent -> this.userName: " + this.userName);
    console.log("LoginComponent  -> this.password: " + this.password);

    // this.productsService
    //   .login(this.uname, this.password)
    //   .subscribe({
    //     next: (jwtTokenObject: {access_token:string}) => {
    //       console.log(jwtTokenObject.access_token);
    //       //this.isLogged = true;

    //       this.logged.emit(true);
    //     }
    // });

    this.login$ = this.authService.login(this.userName, this.password);
    this.loginSubscription = this.login$.subscribe({
      next:(jwtTokenObject:{token:string}) => {
        console.log(jwtTokenObject.token);
        //this.isLogged = true;

        this.logged.emit(true);
      }
    });
  }
}