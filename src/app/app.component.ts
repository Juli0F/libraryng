import { Component, inject } from '@angular/core';
import { JwtService } from './auth/pages/jwt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'libraryng';
  jwtService: JwtService = inject(JwtService);
  username:string = this.jwtService.getClaim('user');
}
