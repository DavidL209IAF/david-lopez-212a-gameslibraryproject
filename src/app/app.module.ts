import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GamesComponent } from './games/games.component';
import { AllGamesComponent } from './games/all-games/all-games.component';
import { AddGameComponent } from './games/add-game/add-game.component';
import { GameDetailsComponent } from './games/game-details/game-details.component';
import { EditGameComponent } from './games/edit-game/edit-game.component';
import { CompletedGamesComponent } from './games/completed-games/completed-games.component';
import { FilterGamesPipe } from './pipes/filter-games.pipe';

const appRoutes: Routes = [
  { path: 'myplaylist', component: GamesComponent},
  { path: 'allgames', component: AllGamesComponent, children: [
    { path: 'new', component: AddGameComponent},
    { path: ':id', component: GameDetailsComponent, children: [
      { path: 'edit', component: EditGameComponent}
    ]}
  ] },
  { path: 'completedgames', component: CompletedGamesComponent}
  ]

@NgModule({
  declarations: [
    AppComponent,
    FilterGamesPipe,
    GamesComponent,
    AllGamesComponent,
    AddGameComponent,
    GameDetailsComponent,
    EditGameComponent,
    CompletedGamesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
