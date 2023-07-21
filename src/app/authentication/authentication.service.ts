import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { LoginResponse } from '../DTOs/login-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private static readonly key = "JWT_KEY";

  constructor(private httpClient: HttpClient) { }

  get isLoggedIn(): boolean{
    return !!this.jwt;
  }

  get jwt(): string{
    return sessionStorage.getItem(AuthenticationService.key) ?? '';
  }

  private set jwt(value: string){
    sessionStorage.setItem(AuthenticationService.key, value);
  }

  get username(): string{
    const payload = this.jwt.split('.')[1];
    const asJson = atob(payload);
    const asObj = JSON.parse(asJson);

    return asObj['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
  }

  login (username: string, password: string):Observable<string>{
    return this.httpClient.post<LoginResponse>(`${environment.serverUrl}/api/authentication/login`,
      {username, password}
    ).pipe(
      tap(r => this.jwt = r.jwtToken),
      map(r => r.expiration)
    );
  }

  logout(): void{
    sessionStorage.removeItem(AuthenticationService.key);
  }
}
