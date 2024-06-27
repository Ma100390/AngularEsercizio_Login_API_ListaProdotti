import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Book } from "../books/book";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
    // URL per ottenere i dati dei libri da una API
    private booksUrl = "https://fakerestapi.azurewebsites.net/api/v1/Books";

    // BehaviorSubject per tenere traccia del titolo del libro selezionato
    private selectedBookTitle = new BehaviorSubject("Nessun titolo selezionato!");

    // Observable per permettere agli altri componenti di ascoltare il titolo del libro selezionato
    getSelectedBookTitle = this.selectedBookTitle.asObservable();

    // Metodo per impostare il titolo del libro selezionato
    setSelectedBook(title: string) {
        // Aggiorna il valore del BehaviorSubject con il nuovo titolo
        this.selectedBookTitle.next(title);
    }

    constructor(private http: HttpClient) { }

    // Metodo per ottenere i dati dei libri dall'API
    getBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(this.booksUrl).pipe(
          // Il tap operator consente di eseguire un'azione (nel nostro caso, la registrazione) 
          // senza modificare l'output dell'Observable.
          tap(data => console.log(data))
      );
    }
}
