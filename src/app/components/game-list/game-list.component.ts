import { Component, OnInit, HostBinding } from '@angular/core';
import { GamesService } from '../../services/games.service';


@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  @HostBinding('class') class='row';
  public games:any=[];

  constructor(private gameService:GamesService) { }

  ngOnInit(): void {
    this.loadGames();
    console.log(this.games);
    
  }

  loadGames():void{
    this.gameService.getGames().subscribe(
      res=>this.games=res,
      err=>console.error(err)
    );
  }

  deleteGame(id:string):void{
    this.gameService.deleteGame(id).subscribe(
      res=>{
        this.loadGames();
        console.log(res);
      },
      err=>console.error(err)
    );
  }

}
