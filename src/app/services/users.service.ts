import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from "rxjs";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginToken } from '../models/token.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class UsersService{

    constructor(private http: HttpClient){}
    url: string = environment.URL;
    private loginToken = new BehaviorSubject<LoginToken>({accessToken: ''});
    cast = this.loginToken.asObservable();

    login(userName: string, password: string): Observable<LoginToken>{
        try {
            return this.http.post<LoginToken>(this.url + '/login', {"userName" : userName, "password": password})
        } catch (error: any){
            return error
        }
    }

    signUp(userName: string, password: string): Observable<string>{
        try {
            return this.http.post<string>(this.url + '/signup', {"userName" : userName, "password": password})
        } catch (error: any){
            return error
        }
    }

    setLoginToken(token: string){
        this.loginToken.next({accessToken: token});
    }

}
