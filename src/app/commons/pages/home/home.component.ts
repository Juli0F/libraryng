import {Component, inject} from '@angular/core';
import {AppModule} from "../../../app.module";
import {CommonModule} from "@angular/common";
import { AuthService } from 'src/app/auth/pages/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent {

  authService: AuthService = inject(AuthService);

}
