import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { Product } from '../product';
import { ProdcutsService } from '../products.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],

  encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(ProductDetailComponent) productDetail?: ProductDetailComponent;
  //Questo observable rappresenta una sequenza di dati che saranno disponibili in futuro, quando la richiesta all'API sarà completata.
//Il componente si sottoscrive a questo observable utilizzando .subscribe(). Questa sottoscrizione è una sorta di promessa che dice al componente: "Appena i dati saranno pronti, esegui queste azioni".
  products$: Observable<Product[]> | undefined; // Observable per i dati dei prodotti
  private productsSubscription: Subscription | undefined; // Sottoscrizione all'Observable
  products: Product[] = []; // Array di prodotti
  selectedProduct: Product | undefined; // Prodotto selezionato

  oggi: Date = new Date(); // Data odierna

  constructor(private productsService: ProdcutsService) {}

  ngOnInit(): void {
    this.getProducts(); // Chiamiamo la funzione per ottenere i dati dei prodotti al momento dell'inizializzazione
  }

  ngAfterViewInit(): void {
    // Questo metodo viene chiamato dopo che la vista è stata inizializzata, ma al momento non contiene alcuna logica specifica.
  }

  ngOnDestroy() {
    this.productsSubscription?.unsubscribe(); // Disconnettiamo la sottoscrizione durante la distruzione del componente
  }
  
  private getProducts() {
    // Questo metodo ottiene i dati dei prodotti dal servizio ProdcutsService.
    console.log("ProductListComponent -> getProducts()");

    this.products$ = this.productsService.getProducts(); // Otteniamo l'Observable dei prodotti dal servizio

    // Sottoscrizione all'Observable per ricevere i dati dei prodotti quando sono disponibili
    this.productsSubscription = this.products$.subscribe({
      next: (products) => {
        // Aggiorniamo l'array 'products' nel componente con i dati ottenuti
        this.products = products as Product[];

        console.log("ProductListComponent -> products: ", products); // Stampa i dati dei prodotti nella console
      }
    });
  }

  onBuy(prodotto: Product) {
    // Questo metodo viene chiamato quando l'utente fa clic su "Acquista ora!" su un prodotto.
    window.alert("Hai appena comprato: " + prodotto.name + " per " + prodotto.price + " euro.");
  }
}
