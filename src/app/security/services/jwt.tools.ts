import { Injectable } from '@angular/core';
import { JWTModel } from '../models/jwt.model';


@Injectable({
    providedIn: 'root'
  })
export class JwtTools {
    private currentToken: JWTModel;

    constructor() {
        this.currentToken = this.getFromStorage();
    }

    public validate(jwt: JWTModel): boolean {
        return jwt != undefined ? jwt.exp > new Date().getTime() / 1000 : false;
    }

    private getFromStorage() {
        let jwt = localStorage.getItem('JWT');
        if (jwt != undefined) {
            return this.parce(jwt);
        }
        return null;
    }

    public parce(jwt) {
        let jwtObj = JSON.parse(atob(jwt.split('.')[1]));
        jwtObj.encoded = jwt;
        return jwtObj;
    }

    public get() {
        return this.validate(this.currentToken) ? this.currentToken : null;
    }

    public isSet(): boolean {
        this.currentToken = this.getFromStorage();
        return this.currentToken != undefined;
    }


    public set(jwt: string): boolean {
        let jwtModel: JWTModel = this.parce(jwt);
        if (jwt == undefined || this.validate(jwtModel) == false) {
            return false;
        }
        this.currentToken = jwtModel;
        localStorage.setItem('JWT', jwtModel.encoded);
        return true;
    }

    public cleanJWT() {
        this.currentToken = null;
        localStorage.removeItem('JWT');
    }
}