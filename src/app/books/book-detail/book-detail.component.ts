import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
    // Variabile per memorizzare il titolo del libro selezionato
    selectedBookTitle: string = "";

    constructor(private bookService: BooksService) {}

    ngOnInit(): void {
        // Nel metodo ngOnInit, ci sottoscriviamo a un Observable dal servizio BooksService
        // per ascoltare eventuali cambiamenti nel titolo del libro selezionato.

        // Quando il servizio emette un nuovo titolo (event), questo verrà assegnato alla variabile selectedBookTitle.
        this.bookService.getSelectedBookTitle.subscribe({
          next: (title: string) => this.selectedBookTitle = title
        });
    }
}
