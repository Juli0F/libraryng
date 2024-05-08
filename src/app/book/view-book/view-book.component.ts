import { Component, OnInit } from '@angular/core';
import { Book } from 'src/models/models';
import { BookService } from 'src/service/book.service';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit {
  books: Book[] = [];
  displayModal = false;
  editBook: Book | null = null;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getAllBooks().subscribe(data => {
      this.books = data;
    });
  }

  showDialog(book?: Book) {
    this.editBook = book || null;
    this.displayModal = true;
  }

  closeModal() {
    this.displayModal = false;
    this.loadBooks();
  }

  deleteBook(book: Book) {
    this.bookService.deleteBook(book.code).subscribe(() => {
      this.loadBooks();
    });
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.books = this.books.filter(b => b.title.toLowerCase().includes(value.toLowerCase()));
  }
  closeModalAndReloadList() {
    this.editBook = null; 
    this.closeModal();
    this.loadBooks();
  }
}
