import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';

  expiration$?: Observable<string>;
  errorMessage = '';

  get loggedIn(): boolean{
    return (this.expiration$ && !this.errorMessage) ?? false;
  }

  constructor(private authenticationService: AuthenticationService){}

  login(): void{
    this.errorMessage = '';
    this.expiration$ = this.authenticationService.login(this.username, this.password).pipe(
      tap(r => console.log (typeof(r))),
      map(r => `You are logged in until ${new DatePipe('en-GB').transform(r, 'longTime')}`),
      catchError(err => {
        this.errorMessage = 'Login failed';
        return throwError(() => new Error(err.message));
      })
    );
  }
}
