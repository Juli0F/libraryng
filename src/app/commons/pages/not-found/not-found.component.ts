import { Component } from '@angular/core';
import { ButtonModule} from "primeng/button";
import { CardModule } from 'primeng/card';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
  standalone: true,
  imports: [ButtonModule, CardModule, RouterLink]
})
export class NotFoundComponent {

}
