import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Career } from 'src/models/models';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  apiUrl = environment.apiUrl + '/career';
  private http: HttpClient = inject(HttpClient);
  getAllCareer() {
    return this.http.get<Career[]>(`${this.apiUrl}/all`);
  }
  createCareer(career: Career) {
    return this.http.post<Career>(`${this.apiUrl}`, career);
  }
  updateCareer(code: string, careerData: Career){
    return this.http.put<Career>(`${this.apiUrl}/update/${code}`, careerData);
  }

  softDeleteCareer(code: string) {
    return this.http.put(`${this.apiUrl}/soft-delete/${code}`, {});
  }


}
