import { Component, OnDestroy, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Book } from '../book';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {
  // Dichiarazione di variabili e servizi

  // books$ è un Observable che rappresenta la lista dei libri.
  books$: Observable<Book[]> | undefined;
  
  // booksSubsrption è una Subscription che gestisce la sottoscrizione all'Observable.
  private booksSubsrption: Subscription | undefined;
  
  // books è un array che conterrà i primi 10 libri da mostrare nel componente.
  books: Book[] = [];

  constructor(private booksService: BooksService) {}

  ngOnInit() {
    // Metodo chiamato quando il componente viene inizializzato.
    this.getBooks();
  }

  ngOnDestroy(): void {
    // Metodo chiamato quando il componente viene distrutto.
    
    // Annulla la sottoscrizione per evitare memory leaks.
    this.booksSubsrption?.unsubscribe();
  }

  getBooks() {
    // Ottieni l'Observable che rappresenta la lista dei libri dal servizio.
    this.books$ = this.booksService.getBooks();
    
    // Crea una Subscription per ascoltare i cambiamenti nell'Observable.
    this.booksSubsrption = this.books$.subscribe({
      next: books => {
        // Questa funzione viene eseguita ogni volta che l'Observable emette nuovi dati (libri).

        // Aggiorna la lista di libri del componente con i primi 10 libri ricevuti dall'Observable.
        this.books = books.slice(0, 10);
      }
    });
  }

  setSelectedBookTitle(title: string) {
    // Imposta il titolo del libro selezionato nel servizio BooksService.
    this.booksService.setSelectedBook(title);
  }
}
