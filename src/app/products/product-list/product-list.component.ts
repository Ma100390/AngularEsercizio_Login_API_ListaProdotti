import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { Product } from '../product';
import { ProdcutsService } from '../products.service';
//import { SingleProductService } from '../single-product/single-product.service';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],

  encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(ProductDetailComponent) productDetail?:ProductDetailComponent;
  
  products$:Observable<Product[]> | undefined;
  private productsSubscription: Subscription | undefined;
  products:Product[] = [];
  selectedProduct:Product | undefined;

  oggi:Date = new Date();

  constructor(private productsService: ProdcutsService) {}

  ngOnInit():void {
    this.getProducts();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy() {
    this.productsSubscription?.unsubscribe();
  }
  
  private getProducts() {
    console.log("ProductListComponent -> getProducts()");

    this.products$ = this.productsService.getProducts();
    this.productsSubscription = this.products$.subscribe({
      next: (products) => {
        this.products = products as Product[]

        console.log("ProductListComponent -> products: " + products);
      }
    })
  }

  onBuy(prodotto:Product)
  {
    window.alert("Hai appena comprato: " + prodotto.name + " per " + prodotto.price + " euro.");
  }
}