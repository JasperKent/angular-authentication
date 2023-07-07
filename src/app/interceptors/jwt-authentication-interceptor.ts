import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationService } from "../authentication/authentication.service";
import { environment } from "src/environments/environment";

@Injectable()
export class JwtAuthenticationInterceptor implements HttpInterceptor{

    constructor (private authenticationService: AuthenticationService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isLoggedIn = this.authenticationService.isLoggedIn;
        const isToServer = req.url.startsWith(environment.serverUrl);

        if (isLoggedIn && isToServer){
            req = req.clone({
                setHeaders: {Authorization: `Bearer ${this.authenticationService.jwt}`}
            });
        }

        return next.handle(req);
    }
    
}