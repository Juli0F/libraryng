import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {JwtService} from "./jwt.service";
import {BehaviorSubject, map, Observable} from "rxjs";
import { environment } from 'src/environments/environment.development';
import { Credentials } from 'src/models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  private baseURl = environment.apiUrl+'/auth';

  private http: HttpClient = inject(HttpClient);
  private jwtService: JwtService = inject(JwtService);
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor() {
  }

  getToken() {
    let token = localStorage.getItem('token');
    return token ? `Bearer ${token}` : null;
  }

  login(credentials: Credentials) {
    return this.http.post(`${this.baseURl}/signin`, credentials, {
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => {
      const body = response.body;
      const headers = response.headers;

      const bearerToken = headers.get('Authorization');
      const token = bearerToken?.replace('Bearer ', '');

      localStorage.setItem('token', token!);
      this.loggedIn.next(true);

      return body;
    }))
    
  }

  isAuthenticated() {
    let token = localStorage.getItem('token');
    this.loggedIn.next(true);
    return token && !this.jwtService.isTokenExpired(token);
  }

  hasRequiredRol(rol: string): boolean {
    let token = localStorage.getItem('token');
    if (!token) return false;

    let userRol = this.jwtService.getClaim('rol');
    return userRol === rol;
  }
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }
}
