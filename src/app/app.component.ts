import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from './services/users.service';
import { LoginToken } from './models/token.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GamesService } from './services/games.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsersService, GamesService]
})
export class AppComponent implements OnInit {
  public isMenuCollapsed = true;
  token: LoginToken = {accessToken: ''}
  userNotFound: number = -1;
  passwordInvalid: number = -1;
  userTaken: number = -1

  constructor(private modalService: NgbModal, private snackBar: MatSnackBar,
     private usersService: UsersService, private route: ActivatedRoute,
     public router: Router, private gamesService: GamesService) {}

  loginButton(content){
      this.modalService.open(content, { size: 'sm' });
  }

  signUpButton(content1){
    this.modalService.open(content1, { size: 'sm' });
}

  logOutButton(){
    this.usersService.setLoginToken('');
    this.gamesService.setGames([]);
    this.snackBar.open("You have logged out. ", "OK", {duration: 1500,
      panelClass: ['snackBar']});
  }

  submitLogin(content, f){
    const userName = f.value.userName;
    const password = f.value.password;
    this.passwordInvalid = -1;
    this.userNotFound = -1;

    try {
    if(userName.length !== 0 && password.length !== 0){
      this.usersService.login(userName, password).subscribe((token) => {
        if(token.accessToken === 'passwordInvalid'){
          this.passwordInvalid = 1;
        } else if (token.accessToken === 'usernameNotFound'){
          this.userNotFound = 1;
        } else {
          this.usersService.setLoginToken('Bearer ' + token.accessToken)
          this.gamesService.getGames().subscribe((games) => {
            this.gamesService.setGames(games)
          })
          this.router.navigate(['/myplaylist'], {relativeTo: this.route})
          this.snackBar.open("Welcome Back " + f.value.userName, "OK", {duration: 1500,
                panelClass: ['snackBar']});
                this.modalService.dismissAll(content);
        }
      })
    }
  } catch (error: any){
    this.snackBar.open(error, "OK", {duration: 1500, panelClass: ['snackBar']});
      this.modalService.dismissAll(content);}
  }
  

  submitSignUp(content1, f1){
    const userName = f1.value.userName;
    const password = f1.value.password;
    this.userTaken = -1;
    this.passwordInvalid = -1;

    try {
      if(userName.length !== 0 && password.length >= 8){
        this.usersService.signUp(userName, password).subscribe((result) => {
          if (result === 'Username is unavailable.'){
            this.userTaken = 1;
          } else if (result === 'User added.'){
            this.snackBar.open("Account Created. You may now Login.", "OK", {duration: 1500,
              panelClass: ['snackBar']});
              this.modalService.dismissAll(content1);
          }
        })

      } else if (password.length < 8){
        this.passwordInvalid = 1
      } 
    } catch (error: any){
      this.snackBar.open(error, "OK", {duration: 1500, panelClass: ['snackBar']});
      this.modalService.dismissAll(content1);}
  }


  ngOnInit(){
    this.usersService.cast.subscribe(token => this.token = token)
  }

  mainRoute(){
    this.router.navigate(['/myplaylist'], {relativeTo: this.route})
  }
  allGamesRoute(){
    this.router.navigate(['/allgames'], {relativeTo: this.route})
  }
  completedGamesRoute(){
    this.router.navigate(['/completedgames'], {relativeTo: this.route})
    
  }
  
}
