import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Game } from 'src/app/models/game.model';
import { LoginToken } from 'src/app/models/token.model';
import { GamesService } from 'src/app/services/games.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  games: Game [] = [];
  game: Game = {
    gameId: -1,
    gameName: '',
    gameYear: -1,
    gameDescription: ``,
    gamePlatform: '', 
    gameStatus: '', 
    gameImage: '',
    userId: -1  //may need to fix
}
  selectedPlatform: string = 'All';
  token: LoginToken = {accessToken: ''}
  id: number = -1;

  constructor(private snackBar: MatSnackBar,
    private usersService: UsersService, private route: ActivatedRoute,
    public router: Router, private gamesService: GamesService) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
     }

  ngOnInit(): void {
    this.usersService.cast.subscribe(token => this.token = token)
    if(this.token.accessToken === ''){
      this.router.navigate(['/'], {relativeTo: this.route})
      }
    this.gamesService.cast.subscribe(games => this.games = games)
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']; //+ is to cast to number
        this.game = this.games.filter(game => game.gameId === this.id)[0]
      }
    );
  }

  markAsUnCompleted(){
    try{
      let game = this.games.filter(game => game.gameId === this.id);
      let index = this.games.findIndex(game => game.gameId === this.id);
  
      this.gamesService.updateGameStatus(game[0], 'Library').subscribe((game) => {
        if(game.length !== 0){
          this.games[index].gameStatus = 'Library';
          this.snackBar.open("Game has been set to Uncompleted.", "OK", {duration: 1500,
            panelClass: ['snackBar']});
        } 
      })
  
      } catch (error:any) {
        this.snackBar.open(error, "OK", {duration: 1500,
          panelClass: ['snackBar']});
      }
  }

  deleteGame(){
    try {
      let index = this.games.findIndex(game => game.gameId === this.id);

      this.gamesService.deleteGame(this.id).subscribe((result) => {
        if(result.toString() === 'success'){
          this.games.splice(index, 1)  //need to fix
          this.snackBar.open("Game has been deleted.", "OK", {duration: 1500,
            panelClass: ['snackBar']});
            this.router.navigate(['../'], {relativeTo: this.route})
        } 
      })

    } catch (error: any) {
      this.snackBar.open(error, "OK", {duration: 1500,
        panelClass: ['snackBar']});
    }
  }

  addToPlaylist(){
    try{
      let game = this.games.filter(game => game.gameId === this.id);
      let index = this.games.findIndex(game => game.gameId === this.id);
  
      this.gamesService.updateGameStatus(game[0], 'Playlist').subscribe((game) => {
        if(game.length !== 0){
          this.games[index].gameStatus = 'Playlist';
          this.snackBar.open("Game has been added to your playlist.", "OK", {duration: 1500,
            panelClass: ['snackBar']});
        } 
      })
  
      } catch (error:any) {
        this.snackBar.open(error, "OK", {duration: 1500,
          panelClass: ['snackBar']});
      }
  }

  markAsCompleted(){
    try{
      let game = this.games.filter(game => game.gameId === this.id);
      let index = this.games.findIndex(game => game.gameId === this.id);
  
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

}
