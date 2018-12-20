
import { finalize, map, share, filter } from 'rxjs/operators';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationStart, NavigationExtras } from '@angular/router';
import { JwtTools } from './jwt.tools';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subscriber } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

//import * as localforage from 'localforage'


import { HttpHeaders } from '@angular/common/http';
import { UrlSerializer, ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { JWTModel } from '../models/jwt.model';
import { AuthModel } from '../models/auth.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements CanActivate {
    public wait: boolean = false;
    public currentUser: BehaviorSubject<User>;

    private authIntervalInstance = null;

    jwtHelper: JwtHelperService = new JwtHelperService();

    private getJsonFromUrl() {
        var query = location.search.substr(1);
        var result = {};
        query.split("&").forEach(function (part) {
            var item = part.split("=");
            result[item[0]] = decodeURIComponent(item[1]);
        });
        return result;
    }

    constructor(private http: HttpClient, private jwtTools: JwtTools, private router: Router, private route: ActivatedRoute) {
        this.currentUser = new BehaviorSubject<User>(null);
        let token = this.jwtTools.get();
        /*else
            router.navigate(['login']);*/
        router.events.pipe(
            filter(event => event instanceof NavigationStart))
            .subscribe((event: NavigationStart) => {
                if (this.authIntervalInstance)
                    clearInterval(this.authIntervalInstance);
            });

            this.initJWTValidationInterval();
    }

    public login(auth: AuthModel): Observable<string> {
        this.wait = true;
        let res = new Observable<string>((observer) => {
            this.logout();
                let res = this.http.post<string>(environment.apiBaseUrl + 'users/login', auth).pipe(map<string, string>((token: string) => {
                    if (this.jwtTools.set(token)) {
                        //this.currentUser.next(token.user);
                    }
                    return token;
                }), share());
                res.subscribe(
                    (token: string) => {
                        this.getAccount().subscribe(() => {
                            this.router.navigate(['dashboard']);
                            observer.next(token);
                            observer.complete();
                        });
                        this.wait = false;
                    },
                    (error) => {
                        this.wait = false;
                        observer.error(error);
                        observer.complete();
                    }
                );
        });
        return res;
    }

    getAccount(force?: boolean): Observable<any> {
        if (force || this.currentUser.value == null) {
            let observable = null;
            observable = this.http.get<User>(environment.apiBaseUrl + 'users/credentials').pipe(map<any, User>((data: any) => {
                return Object.assign(new User(), data);
            }), share());
            observable.subscribe((user: User) => {
                this.currentUser.next(user);
            });
            return observable;
        }
        return this.currentUser.asObservable();
    }

    public logout() {
        this.jwtTools.cleanJWT();
        this.currentUser.next(null);
        this.deleteAllCookies();
    }

    deleteCookie(cookiename) {
        var d = new Date();
        d.setDate(d.getDate() - 1);
        var expires = ";expires=" + d;
        var name = cookiename;
        var value = "";
        document.cookie = name + "=" + value + expires + "; path=/acc/html";
    }

    private deleteAllCookies() {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var spcook = cookies[i].split("=");
            this.deleteCookie(spcook[0]);
        }
    }

    private redirectToLogin() {
        let params = this.jwtTools.isSet() ? { error: 401 } : {};
        this.logout();
        clearInterval(this.authIntervalInstance);
        this.router.navigate(['/login', params]);
    }

    initJWTValidationInterval() {
        setInterval(() => {
            if (this.jwtTools.get() == null) {
                this.redirectToLogin();
            }
        }, 10000);
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (this.jwtTools.get() != null) {
            this.authIntervalInstance = this.initJWTValidationInterval();
            return true;
        }
        if (!this.wait)
            this.redirectToLogin();
        return false;
    }

}
