import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { Product } from './product';

@Directive({
  selector: '[appProductOffer]'
})
export class ProductOfferDirective implements OnInit {
  @Input() productList?: ProductListComponent;
  //offerte: Product[] = [];
  idOfferte: number[] = [];

  constructor(private viewContainer: ViewContainerRef) { 
    /*this.offerte = [
      {id: 1, name: "pasta", price: 1},
      {id: 2, name: "cioccolato", price: 100},
      {id: 3, name: "pizza", price: 1200}
    ];*/

    this.idOfferte = [1, 2, 3];
  }

  ngOnInit(): void {
    //console.log("productList: " + this.productList);

    //throw new Error('Method not implemented.');

    /*//Versione 1.
    const runtimeProductRef = this.viewContainer.createComponent(ProductDetailComponent);

    runtimeProductRef.setInput('product', {name: "pasta", price: 1});

    const runtimeProductRef2 = this.viewContainer.createComponent(ProductDetailComponent);

    runtimeProductRef2.setInput('product', {name: "pasta", price: 1});*/

    /*//Versione 2.
    for(const offerta of this.offerte)
    {
      let offertaRef = this.viewContainer.createComponent(ProductDetailComponent);
      offertaRef.setInput('product', offerta);
      //offertaRef.setInput('id', offerta.id);
      offertaRef.instance.bought.subscribe((e) => this.productList?.onBuy(offerta));
      //offertaRef.instance.bought.subscribe(evt => console.log("a"));
      //offertaRef.location.nativeElement.addEventListener('click',  myClickHandler.bind(this));
    }*/

    //Versione 3.
    for(const idOfferta of this.idOfferte)
    {
      let offertaRef = this.viewContainer.createComponent(ProductDetailComponent);
      offertaRef.setInput('id', idOfferta);
      offertaRef.instance.bought.subscribe((e) => this.productList?.onBuy(offertaRef.instance.product!));
    }
  }
}