import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { BookReviewRepositoryService } from './book-review-repository/book-review-repository.service';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ReviewsComponent } from './reviews/reviews.component';
import { JwtAuthenticationInterceptor } from './interceptors/jwt-authentication-interceptor';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReviewsComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    BookReviewRepositoryService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtAuthenticationInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
