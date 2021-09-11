import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/app/models/game.model';
import { LoginToken } from 'src/app/models/token.model';
import { GamesService } from 'src/app/services/games.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {
  games: Game [] = [];
  game: Game = {
    gameId: -1,
    gameName: '',
    gameYear: -1,
    gameDescription: ``,
    gamePlatform: '', 
    gameStatus: '', 
    gameImage: '',
    userId: -1  
}
  selectedPlatform: string = 'All';
  token: LoginToken = {accessToken: ''}
  gameStatus: string = '';

@ViewChild('f', { read: NgForm }) gameEditForm: any;

  constructor(private route: ActivatedRoute, private gamesService: GamesService,
    public router: Router, private snackBar: MatSnackBar,
     private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.cast.subscribe(token => this.token = token)
    this.gamesService.cast.subscribe(games => this.games = games)
    if(this.token.accessToken === ''){
      this.router.navigate(['/'], {relativeTo: this.route})
      }
  }

  onFormSubmit(){
    try {
    this.game.gameName = this.gameEditForm.value.gameName;
    this.game.gameDescription = this.gameEditForm.value.gameDescription;
    this.game.gameYear = this.gameEditForm.value.gameYear;
    this.game.gameImage = this.gameEditForm.value.gameImageURL;
    this.game.gamePlatform = this.gameEditForm.value.gamePlatform;
    this.game.gameStatus = this.gameEditForm.value.gameStatus;

    this.gamesService.addGame(this.game).subscribe((game) => {
      if(game.length !== 0)
        this.games.push(game[0]);
          this.snackBar.open("Game has been added.", "OK", {duration: 1500,
            panelClass: ['snackBar']});
            this.router.navigate(['../'], {relativeTo: this.route})
          });
       } catch (error: any){

        this.snackBar.open(error, "OK", {duration: 1500,
          panelClass: ['snackBar']});

       }
    }

  onCancel(){
    this.snackBar.open("Game add Cancelled.", "OK", {duration: 1500,
      panelClass: ['snackBar']});

      this.router.navigate(['../'], {relativeTo: this.route})
  }

}
