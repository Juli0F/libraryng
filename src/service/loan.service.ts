import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loan, LoanResponseDto } from 'src/models/models';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  apiUrl = environment.apiUrl + '/loans';
  
  constructor(private http: HttpClient) { }

  createLoan(loan: Loan): Observable<Loan> {
    return this.http.post<Loan>(this.apiUrl, loan);
  }

  getLoanById(id: number): Observable<Loan> {
    return this.http.get<Loan>(`${this.apiUrl}/${id}`);
  }

  updateLoan(id: number, loan: Loan): Observable<Loan> {
    return this.http.put<Loan>(`${this.apiUrl}/${id}`, loan);
  }

  closeLoan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  //--
  getAllLoans(){
    return this.http.get<LoanResponseDto[]>(`${this.apiUrl}`);
  }
  softDeleteLoan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
