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
  @Input() id = -1; // Input per l'ID del prodotto
  @Input() product: Product | undefined; // Input per il prodotto selezionato
  @Output() bought = new EventEmitter<Product>(); // Output per l'evento "acquisto" di un prodotto

  product$: Observable<Product> | undefined; // Observable per il dettaglio del prodotto
  private productSubscription: Subscription | undefined; // Sottoscrizione all'Observable

  constructor(private productsService: ProdcutsService) {
    // Costruttore del componente, inizializzato con il servizio ProductsService
  }

  ngOnInit(): void {
    // Metodo chiamato all'inizializzazione del componente
  }

  ngAfterViewInit(): void {
    // Metodo chiamato dopo che la vista del componente è stata inizializzata
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Metodo chiamato quando ci sono cambiamenti nei dati di input

    this.product$ = this.productsService.getProduct(this.id); // Ottiene i dettagli del prodotto dal servizio

    this.productSubscription = this.product$.subscribe({
      next: product => {
        // Aggiorna il prodotto con i dettagli ottenuti
        this.product = product as Product;
        console.log(product); // Stampa i dettagli del prodotto nella console
      }
    });
  }

  ngOnDestroy(): void {
    // Metodo chiamato quando il componente è distrutto

    this.productSubscription?.unsubscribe(); // Disconnette la sottoscrizione per evitare memory leak
  }

  buy(product: Product): void {
    // Metodo che gestisce l'acquisto di un prodotto

    console.log("ProductDetailComponent -> buy()");

    this.product = product; // Aggiorna il prodotto selezionato con quello acquistato
    this.bought.emit(product); // Emette l'evento "acquisto" con il prodotto come parametro
  }
}
