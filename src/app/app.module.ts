import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProductsModule } from './products/products.module';
import { ProdcutsService } from './products/products.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from './logins/login.module';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookDetailComponent
  ],
  imports: [
    BrowserModule,
    ProductsModule,
    HttpClientModule,
    LoginModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }