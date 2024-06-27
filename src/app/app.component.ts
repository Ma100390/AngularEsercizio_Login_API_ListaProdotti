import { Component, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
//import { AuthenticationService } from './logins/authentication.service';
import { ProdcutsService } from './products/products.service';
import { WelcomeComponent } from './logins/welcome/welcome.component';
import { UserData } from './logins/userdata'
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent implements OnDestroy {
  title = 'Test con Rest API e token.';

  @ViewChild(WelcomeComponent) welcome: WelcomeComponent | undefined;

  userData$:Observable<UserData> | undefined;
  private userDataSubscription:Subscription | undefined;
  
  isLogged: boolean = false;

  //constructor(private authenticationService:AuthenticationService) {}
  //constructor(private productsService:ProdcutsService) {}
  constructor(private authService:AuthService) {}

  ngOnDestroy(): void {
    this.userDataSubscription?.unsubscribe();
  }

  onLoggedOut()
  {
    this.isLogged = false;
  }

  onLogged(isLogged: boolean)
  {
    console.log("AppComponent -> onLogged()");

    this.isLogged = isLogged;

    console.log("AppComponent: -> isLogged: " + isLogged);

    this.userData$ = this.authService.getUserData();
    this.userDataSubscription =  this.userData$.subscribe({
      next:(userData: UserData) => {
        console.log(userData);

        this.welcome!.name = userData.userName;
        //this.welcome!.avatar = userData.userAvatar;
        this.welcome!.lastname = userData.userLastname;
      }
    })
  }
}