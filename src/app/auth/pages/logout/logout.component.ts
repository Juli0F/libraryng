import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logout',
  template: ``,
  styles: [``],
  standalone: true
})
export class LogoutComponent implements OnInit {

  private router: Router = inject(Router);

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.authService.logout();
  }

}
