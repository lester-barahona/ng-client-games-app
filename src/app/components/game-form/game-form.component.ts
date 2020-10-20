import { Component, OnInit, HostBinding } from '@angular/core';
import { Game } from '../../models/game';
import { GamesService } from '../../services/games.service';
//para hacer los redirect automaticos
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {
  @HostBinding('class') class='row';
  
  public image:any;
  public url:string= 'http://www.chesapeakevamartialarts.com/blog/wp-content/uploads/2015/10/no_logo.gif';

  public game:Game={
    id:0,
    title:'',
    description:'',
    image:'',
    created_at:new Date()
  };

  public edit:boolean=false;

  constructor(private gameService:GamesService,private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    const params=this.activatedRoute.snapshot.params;
    if(params.id){
      
      this.gameService.getGame(params.id).subscribe(
        res=>{
          console.log(res);
          
          this.game=res[0];
          this.url='http://localhost:3000/image/game_'+this.game.image;
          this.edit=true;
        },
        err=>console.error(err)
        
      );
    }
  }

  selectImage(event:any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.game.image=file.name;
      this.image = file;
      var reader = new FileReader();
      reader.onload = (event:any) => {
       this.url = event.target.result;
      }
      reader.readAsDataURL(file);
    }
  }

  sendImageToLoad(){
    if(this.image){
    const formData = new FormData();
    formData.append('file', this.image);
    this.gameService.upload(formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    }  
  }

  saveNewGame(){
    delete this.game.created_at;
    delete this.game.id;
    this.gameService.insertGame(this.game).subscribe(
      res=>{
        console.log(res);
        this.sendImageToLoad(); 
        this.router.navigate(['/games']);
      },
      err=>console.error(err)
    );
  }

  updateGame(){
    delete this.game.created_at;
    this.gameService.updateGame(this.game.id,this.game).subscribe(
      res=>{
        console.log(res);
        this.sendImageToLoad(); 
        this.router.navigate(['/games']);
      },
      err=>console.error(err)
    );
   
  }
}
