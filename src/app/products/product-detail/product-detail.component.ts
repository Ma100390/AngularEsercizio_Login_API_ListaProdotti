import { AfterViewInit, OnChanges, OnInit, SimpleChanges, ViewEncapsulation, Component, EventEmitter, Input, Output, OnDestroy} from '@angular/core';
import { Product } from "../product";
import { Observable, Subscription } from "rxjs";
import { ProdcutsService } from "../products.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ProductDetailComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() id = -1;
  @Input() product: Product | undefined;
  //@Input() name: string = "";
  @Output() bought = new EventEmitter<Product>();
  //descrizione: string = "AAA BBB CCC DDD";

  product$: Observable<Product> | undefined;
  private productSubscription: Subscription | undefined;

  constructor(private productsService:ProdcutsService){
    //console.log("Il nome è 1: " + this.name);
  }

  ngOnInit(): void {
    //console.log("Il nome è 2: " + this.name);
  }

  ngAfterViewInit(): void {

  }
  
  ngOnChanges(changes: SimpleChanges): void
  {
    /*let persona1 = {
      nome: "Paolo",
      cognome: "Rossi",
      anni: 55,
      "facoltà universitaria": "informatica"
    }

    persona1['facoltà universitaria'];
    persona1["nome"];*/

    /*const product = changes['name'];
    if(!product.isFirstChange()) {
      const oldValue = product.previousValue;
      const newValue = product.currentValue;
      
      console.log(`Product changed from ${oldValue} to ${newValue}`);
    }*/

    /*const product = changes['product'];
    if(!product.isFirstChange()) {
      const oldValue = product.previousValue.name;
      const newValue = product.currentValue.name;
      
      console.log(`Product changed from ${oldValue} to ${newValue}`);
    }*/
    
    this.product$ = this.productsService.getProduct(this.id);
    this.productSubscription = this.product$.subscribe({
      next: product => {
        this.product = product as Product
        console.log(product);
      }
    })
  }

  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
    this.productSubscription?.unsubscribe();
  }

  /*private anni: number = 0;

  setAnni(anniTemp: number)
  {
    if(anniTemp >= 0 && anniTemp <= 3)
      this.anni = anniTemp;
    else
      this.anni = 2;

    console.log(this.anni);
  }*/

  buy(product:Product):void
  {
    console.log("ProductDetailComponent -> buy()");

    //console.log(this.product);
    //this.bought.emit(this.product?.name);
    //this.bought.emit(this.product);

    this.product = product;
    this.bought.emit(product);
  }
}