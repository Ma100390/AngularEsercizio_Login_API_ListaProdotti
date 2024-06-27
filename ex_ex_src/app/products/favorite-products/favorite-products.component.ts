import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product';
//import { ProdcutsService } from '../products.service';


@Component({
  selector: 'app-favorite-products',
  templateUrl: './favorite-products.component.html',
  styleUrls: ['./favorite-products.component.css']
})
export class FavoriteProductsComponent implements OnInit {
  //@Input() products$: Observable<Product[]> | undefined;
  @Input() products: Product[] = [];

  //constructor(private productService: ProdcutsService) {}

  ngOnInit(): void {
    //this.getProducts();
  }

  // private getProducts() {
  //   this.productService.getProducts().subscribe({
  //     next:(products) => this.products = products,
  //   })
  // }
}