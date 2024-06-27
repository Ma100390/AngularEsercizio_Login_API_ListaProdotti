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
 // Questo è il metodo che viene chiamato quando il componente viene inizializzato.
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
// Questo è il metodo per ottenere il prodotto specifico in base all'ID.
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
 // Questo è il metodo chiamato quando il componente viene distrutto per evitare memory leak.
  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
    this.productSub.next(); // Invia una notifica al flusso di dati che il componente viene distrutto.
    this.productSub.complete(); // Completa il flusso di dati per evitare memory leak.
  }
}