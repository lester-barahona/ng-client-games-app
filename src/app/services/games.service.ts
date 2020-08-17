import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from '../models/game';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private API_URI='http://localhost:3000/api';
  private http:HttpClient;

  constructor(http:HttpClient) {
    this.http=http;
   }

  getGames(){
    return this.http.get(`${this.API_URI}/games`);
  }

  getGame(id:string){
    return this.http.get(`${this.API_URI}/games/${id}`);
  }

  insertGame(game:Game){
    return this.http.post(`${this.API_URI}/games`,game);
  }

  updateGame(id:string|number,game:Game):Observable<Game>{
    return this.http.put(`${this.API_URI}/games/${id}`,game);
  }

  deleteGame(id:string){
    return this.http.delete(`${this.API_URI}/games/${id}`);
  }

  upload(form:FormData){
   return this.http.post<any>('http://localhost:3000/file', form);
  }

}
