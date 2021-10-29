import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable, observable } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData  = new BehaviorSubject(null);

  constructor( private _HttpClient : HttpClient) { }

  saveUserData()
  {
    
    let incodedUserData = JSON.stringify(localStorage.getItem('userToken'));

    this.userData.next( jwtDecode(incodedUserData) );
    
    console.log(this.userData)

  }

  register(formData:object) : Observable<any>
  {

     return this._HttpClient.post("https://route-egypt-api.herokuapp.com/signup" , formData)
  
  }

  login(formData:object) : Observable<any>
  {

     return this._HttpClient.post("https://route-egypt-api.herokuapp.com/signin" , formData)
  
  }

  logout(formData:object) : Observable<any>
  {

     return this._HttpClient.post("https://route-egypt-api.herokuapp.com/signOut" , formData)
  
  }

  isLoggedIn()
  {
    return !!localStorage.getItem('userToken')
  }

}
