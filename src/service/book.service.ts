import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from 'src/models/models';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = environment.apiUrl+ '/books';

  constructor(private http: HttpClient) { }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  getBookByCode(code: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${code}`);
  }

  updateBook(code: string, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${code}`, book);
  }

  deleteBook(code: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${code}`);
  }
  getAllBooks(){
    return this.http.get<Book[]>(`${this.apiUrl}/all`)
  }
}
