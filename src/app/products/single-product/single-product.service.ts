import { Injectable } from '@angular/core';
import { ProdcutsService } from '../products.service';
import { Product } from '../product';
import { Observable, switchMap, of } from 'rxjs';

@Injectable()
export class SingleProductService {
  private product: Product | undefined;

  constructor(private productService: ProdcutsService) { }

  /*getProduct(id: number): Product | undefined
  {
    const products = this.productService.getProducts();

    if(!this.product)
    {
      this.product = products[id];
    }

    return this.product;
  }*/

  getProduct(id: number): Observable<Product> {
    return this.productService.getProducts().pipe(
      switchMap(products => {
        if(!this.product) {
          this.product = products[id];
        }
        return of(this.product);
      })
    )
  }
}
