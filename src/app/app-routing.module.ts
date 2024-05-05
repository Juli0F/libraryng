import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewCareerComponent } from './career/view-career/view-career.component';
import { ViewLoanComponent } from './loan/view-loan/view-loan.component';

const routes: Routes = [
  { path : "home", component: HomeComponent },
  { path : "career", component: ViewCareerComponent },
  { path : "loan", component: ViewLoanComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
