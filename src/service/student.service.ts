import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student, StudentDto } from 'src/models/models';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  apiUrl = environment.apiUrl + '/student';
  
  constructor(private http: HttpClient) { }

  createStudent(student: StudentDto): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  getStudentById(carnet: string): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${carnet}`);
  }

  updateStudent(carnet: string, student: StudentDto): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${carnet}`, student);
  }

  closeStudent(carnet: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${carnet}`);
  }
  //--
  getAllStudents(){
    return this.http.get<Student[]>(`${this.apiUrl}`);
  }
  getAllStudentsEntity(){
    return this.http.get<Student[]>(`${this.apiUrl}/entities`);
  }
  deleteStudent(carnet: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${carnet}`);
  }
}
