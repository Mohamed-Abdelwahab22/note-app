import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  
  

  constructor(private _HttpClient : HttpClient) { 
    
  }

  getAllNotes(data : any):Observable<any> 
  {
    return this._HttpClient.get("https://route-egypt-api.herokuapp.com/getUserNotes" , data)

  }

  addNote(data : any):Observable<any> 
  {
    return this._HttpClient.post("https://route-egypt-api.herokuapp.com/addNote" , data)

  }

  deleteNote(data : any):Observable<any> 
  {

    let options = {

      body:{
        NoteID : data.noteID,
        token: data.token
      }

    }

    return this._HttpClient.delete("https://route-egypt-api.herokuapp.com/deleteNote" , options)

  }

  updateNote(data : any):Observable<any> 
  {
    return this._HttpClient.put("https://route-egypt-api.herokuapp.com/updateNote" , data)

  }



}
