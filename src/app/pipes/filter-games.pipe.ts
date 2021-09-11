import { Pipe, PipeTransform } from '@angular/core';
import { Game } from '../models/game.model';


@Pipe({
    name: 'filterGames',
    pure: false
})

export class FilterGamesPipe implements PipeTransform {
    transform(games: Game[], filterStatus: string, platform: string): Game[] {

       let sortedArray: Game[] = games.sort((firstGame, secondGame) => firstGame.gameName.localeCompare(secondGame.gameName));

        if(platform !== 'All'){
            if(filterStatus.length !== 0){
                return sortedArray.filter(game => game.gameStatus === filterStatus && game.gamePlatform == platform);
            } else {
                return sortedArray.filter(game => game.gamePlatform === platform);
            }
        } else {
            if(filterStatus.length !== 0){
                return sortedArray.filter(game => game.gameStatus === filterStatus);
            } else {
                return sortedArray;
            }
        }
    }
}