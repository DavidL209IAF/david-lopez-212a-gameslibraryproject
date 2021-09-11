import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { LoginToken } from 'src/app/models/token.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-all-games',
  templateUrl: './all-games.component.html',
  styleUrls: ['./all-games.component.css']
})
export class AllGamesComponent implements OnInit {

  games: Game[] = [];
  selectedPlatform: string = 'All';
  token: LoginToken = {accessToken: ''}

  constructor(private snackBar: MatSnackBar,
    private usersService: UsersService, private route: ActivatedRoute,
    public router: Router, private gamesService: GamesService) { 
    }

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

  addToPlaylist(id: number){

      try{
      let game = this.games.filter(game => game.gameId === id);
      let index = this.games.findIndex(game => game.gameId === id);
  
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

  deleteGame(id: number){
    try {
      let index = this.games.findIndex(game => game.gameId === id);

      this.gamesService.deleteGame(id).subscribe((result) => {
        if(result.toString() === 'success'){
          this.games.splice(index, 1)  //need to fix
          this.snackBar.open("Game has been deleted.", "OK", {duration: 1500,
            panelClass: ['snackBar']});
        } 
      })

    } catch (error: any) {
      this.snackBar.open(error, "OK", {duration: 1500,
        panelClass: ['snackBar']});
    }
  }

}
