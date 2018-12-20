import { HttpClient } from '@angular/common/http';
import { Observable  } from 'rxjs';

import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtTools } from '../services/jwt.tools';

@Injectable({
    providedIn: 'root'
  })
export class HttpAuthInterceptor implements HttpInterceptor {
    constructor(private jwtTools: JwtTools) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let jwt = this.jwtTools.get();
        if (jwt) {
            const changedReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + jwt.encoded) });
            return next.handle(changedReq);
        }
        return next.handle(req);
    }
}