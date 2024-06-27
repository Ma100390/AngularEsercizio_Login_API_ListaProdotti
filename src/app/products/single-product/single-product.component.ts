import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SingleProductService } from './single-product.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css'],
  providers: [SingleProductService]
})
export class SingleProductComponent implements OnInit, OnDestroy {

  private productSub: Subject<void> = new Subject<void>();
  
  @Input() id = -1;
  name: string = "";
  price: number = 0;

  constructor(private singleProduct:SingleProductService)
  {
  }

  /*ngOnInit(): void {
    const product = this.singleProduct.getProduct(this.id);

    if(product)
    {
      this.name = product.name;
      this.price = product.price;
    }
  }*/

  ngOnInit(): void {
    this.getProduct();
  }

  /*private getProduct() {
   
    this.singleProduct.getProduct(this.id).subscribe({
      next:product => {
        if (product) {
          this.name = product.name;
          this.price = product.price;
        }
      }
    })
  }*/

  private getProduct() {
     this.singleProduct.getProduct(this.id).pipe(
      takeUntil(this.productSub)
     ).subscribe({
      next:product => {
        if (product) {
          this.name = product.name;
          this.price = product.price;
        }
      }
    })
  }

  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
    this.productSub.next();
    this.productSub.complete();
  }
}