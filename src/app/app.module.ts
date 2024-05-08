import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateStudentComponent } from './student/create-student/create-student.component';
import { CreateCareerComponent } from './career/create-career/create-career.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';
import { ViewCareerComponent } from './career/view-career/view-career.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MenubarModule} from 'primeng/menubar';
import { MessageService, SharedModule } from "primeng/api";
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewLoanComponent } from './loan/view-loan/view-loan.component';
import { CreateLoanComponent } from './loan/create-loan/create-loan.component';
import { HomeComponent } from './home/home.component';
import { ViewReservationComponent } from './reservation/view-reservation/view-reservation.component';
import { CreateReservationComponent } from './reservation/create-reservation/create-reservation.component';
import { ViewStudentComponent } from './student/view-student/view-student.component';
import { DropdownModule } from 'primeng/dropdown';
import { ViewBookComponent } from './book/view-book/view-book.component';
import { CreateBookComponent } from './book/create-book/create-book.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateStudentComponent,
    CreateCareerComponent,
    ViewCareerComponent,
    NavbarComponent,
    ViewLoanComponent,
    CreateLoanComponent,
    HomeComponent,
    ViewReservationComponent,
    CreateReservationComponent,
    ViewStudentComponent,
    ViewBookComponent,
    CreateBookComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    CardModule,
    HttpClientModule,
    MenubarModule,
    TableModule,
    DialogModule,
    BrowserAnimationsModule,
    DropdownModule,
    ToastModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
