import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SortPipe } from './sort.pipe';
import { CustomClockDirective } from './custom-clock.directive';
import { ProductOfferDirective } from './product-offer.directive';
import { FavoriteProductsComponent } from './favorite-products/favorite-products.component';
//import { ProdcutsService } from './products.service';
import { SingleProductComponent } from './single-product/single-product.component';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    SortPipe,
    CustomClockDirective,
    ProductOfferDirective,
    FavoriteProductsComponent,
    SingleProductComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductListComponent,
    CustomClockDirective
  ],
  /*providers: [
    ProdcutsService
  ]*/
})
export class ProductsModule { }
