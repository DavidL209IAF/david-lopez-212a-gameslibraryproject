import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from "rxjs";
import { Observable } from 'rxjs';
import { LoginToken } from '../models/token.model';
import { UsersService } from "./users.service";
import { Game } from "../models/game.model";
import { HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment";

@Injectable()
export class GamesService{

    token: LoginToken = {accessToken: ''};
    url: string = environment.URL;
    private games = new BehaviorSubject<Game[]>([]);
    cast = this.games.asObservable();

    constructor(private http: HttpClient, private usersService: UsersService){
    }

    getGames(): Observable<Game[]> {
        try {
            this.usersService.cast.subscribe(token => this.token = token);
           const httpOptions = {headers: new HttpHeaders({
                  'auth': this.token.accessToken})};
            return this.http.get<Game[]>(this.url + '/myplaylist', httpOptions)
        } catch (error: any){
            return error
        }
    }

    setGames(games: Game[]){
        this.games.next(games)
    }

    updateGameStatus(game: Game, status: string): Observable<Game[]>{
        try{
            const httpOptions = {headers: new HttpHeaders({
                'auth': this.token.accessToken})};

                game.gameStatus = status;

            return this.http.put<Game[]>(this.url + '/allgames/' + game.gameId + '/edit', game , httpOptions)
        } catch (error: any){
            return error
        }
    }

    updateGame(game: Game): Observable<Game[]>{
        try {
            const httpOptions = {headers: new HttpHeaders({
                'auth': this.token.accessToken})};
                
                return this.http.put<Game[]>(this.url + '/allgames/' + game.gameId + '/edit', game , httpOptions)
        } catch (error: any) {
            return error
        }
    }
    
    deleteGame(id: number): Observable<string>{
        try {
            const httpOptions = {headers: new HttpHeaders({
                'auth': this.token.accessToken})};
                return this.http.delete<string>(this.url + '/allgames/' + id, httpOptions)
        } catch (error: any) {
            return error
        }
    }

    addGame(game: Game): Observable<Game[]>{
        try {
            const httpOptions = {headers: new HttpHeaders({
                'auth': this.token.accessToken})};
                
                return this.http.post<Game[]>(this.url + '/allgames/new', game , httpOptions)
        } catch (error: any) {
            return error
        }
    }
}