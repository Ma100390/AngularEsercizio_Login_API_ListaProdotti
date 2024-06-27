import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  declarations: [
    LoginComponent,
    WelcomeComponent,
    LogoutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    LoginComponent,
    WelcomeComponent,
    LogoutComponent
  ]
})
export class LoginModule { }