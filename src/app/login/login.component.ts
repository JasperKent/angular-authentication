import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';

  expiration$?: Observable<Date>;

  constructor(private authenticationService: AuthenticationService){}

  login(): void{
    this.expiration$ = this.authenticationService.login(this.username, this.password);
  }
}
