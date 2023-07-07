import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReviewsComponent } from './reviews/reviews.component';

const routes: Routes = [
  {path: 'all-reviews', component: ReviewsComponent, data: { style: 'all'} },
  {path: 'review-summary', component: ReviewsComponent, data: { style: 'summary'}  },
  {path: 'login', component: LoginComponent },
  {path: '', redirectTo: 'all-reviews', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
