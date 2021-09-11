import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '../models/game.model';
import { LoginToken } from '../models/token.model';
import { GamesService } from '../services/games.service';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: Game[] = [];
  selectedPlatform: string = 'All';
  token: LoginToken = {accessToken: ''}

  constructor(private snackBar: MatSnackBar,
    private usersService: UsersService, private route: ActivatedRoute,
    public router: Router, private gamesService: GamesService) { }

  ngOnInit(): void {
    this.usersService.cast.subscribe(token => this.token = token)
    this.gamesService.cast.subscribe(games => this.games = games)
    if(this.token.accessToken === ''){
      this.router.navigate(['/'], {relativeTo: this.route})
      }
  }

  onFilter(platform: string){
    this.selectedPlatform = platform;
  }

  updateStatusButton(id: number){
    try{
    let game = this.games.filter(game => game.gameId === id);
    let index = this.games.findIndex(game => game.gameId === id);

    this.gamesService.updateGameStatus(game[0], 'Completed').subscribe((game) => {
      if(game.length !== 0){
        this.games[index].gameStatus = 'Completed';
        this.snackBar.open("Game has been set to Completed.", "OK", {duration: 1500,
          panelClass: ['snackBar']});
      } 
    })

    } catch (error:any) {
      this.snackBar.open(error, "OK", {duration: 1500,
        panelClass: ['snackBar']});
    }
  }

  removeFromPlaylist(id: number){
    try{
      let game = this.games.filter(game => game.gameId === id);
      let index = this.games.findIndex(game => game.gameId === id);
  
      this.gamesService.updateGameStatus(game[0], 'Library').subscribe((game) => {
        if(game.length !== 0){
          this.games[index].gameStatus = 'Library';
          this.snackBar.open("Game has been removed from your playlist.", "OK", {duration: 1500,
            panelClass: ['snackBar']});
        } 
      })
  
      } catch (error:any) {
        this.snackBar.open(error, "OK", {duration: 1500,
          panelClass: ['snackBar']});
      }
  }



}
