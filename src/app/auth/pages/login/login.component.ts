import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import { Credentials } from 'src/models/models';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  private messageService: MessageService = inject(MessageService);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  credentials: Credentials = new Credentials();

  constructor() { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
      console.log("Autenticado")
      return;
    }
  }

  onSubmit(form: NgForm): void {
    this.credentials = form.value;

    this.authService.login(this.credentials)
      .subscribe({
        next: response => {
          window.location.reload();
        },
        error: error => {
          this.messageService.add({severity:'error', summary:'Error', detail:'Invalid credentials'});
        }
      });
  }
}
