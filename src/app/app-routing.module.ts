import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewCareerComponent } from './career/view-career/view-career.component';
import { ViewLoanComponent } from './loan/view-loan/view-loan.component';
import { ViewReservationComponent } from './reservation/view-reservation/view-reservation.component';
import { ViewStudentComponent } from './student/view-student/view-student.component';
import { ViewBookComponent } from './book/view-book/view-book.component';

const routes: Routes = [
  { path : "", component: HomeComponent },
  { path : "career", component: ViewCareerComponent },
  { path : "loan", component: ViewLoanComponent},
  { path : "reservation", component: ViewReservationComponent},
  { path : "student", component: ViewStudentComponent },
  { path : "book", component: ViewBookComponent }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
