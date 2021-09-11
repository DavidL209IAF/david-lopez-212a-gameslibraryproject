import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Game } from 'src/app/models/game.model';
import { LoginToken } from 'src/app/models/token.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GamesService } from 'src/app/services/games.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit {
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
  id: number = -1;
  gameStatus: string = '';

@ViewChild('f', { read: NgForm }) gameEditForm: any;


  constructor(private route: ActivatedRoute, private gamesService: GamesService,
    public router: Router, private snackBar: MatSnackBar,
     private usersService: UsersService) { 
     }

  ngOnInit(): void {
    this.usersService.cast.subscribe(token => this.token = token)
    this.gamesService.cast.subscribe(games => this.games = games)
    if(this.token.accessToken === ''){
      this.router.navigate(['/'], {relativeTo: this.route})
      }

    this.route.parent?.params.subscribe(params => {
      this.id = +params['id'];
      })
      this.game = this.games.filter(game => game.gameId === this.id)[0]
      if(this.game.gameStatus.length > 0){
      this.gameStatus = this.game.gameStatus;
      } else {
        this.gameStatus = 'Library'
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

    let index = this.games.findIndex(game => game.gameId === this.id);

    this.gamesService.updateGame(this.game).subscribe((game) => {
      if(game.length !== 0){
        this.games[index] = game[0];
          this.snackBar.open("Game has been updated.", "OK", {duration: 1500,
            panelClass: ['snackBar']});
            this.router.navigate(['../'], {relativeTo: this.route})
      }
    });
       } catch (error: any){

        this.snackBar.open(error, "OK", {duration: 1500,
          panelClass: ['snackBar']});

       }
    }
  


  onCancel(){
    this.snackBar.open("Game edit Cancelled.", "OK", {duration: 1500,
      panelClass: ['snackBar']});

      this.router.navigate(['../'], {relativeTo: this.route})
  }
}
