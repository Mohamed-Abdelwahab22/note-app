import { Component, OnInit } from '@angular/core';

import { FormGroup , FormControl , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

declare var $ : any

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  error : string = '';

  loginForm:FormGroup = new FormGroup({
    email : new FormControl(null , [ Validators.required ,Validators.email]),
    password : new FormControl(null , [ Validators.required , Validators.pattern(`^[A-Z][a-z]{2,8}$`)]),

  })

  constructor( public _AuthService : AuthService  , public _Router : Router) { }


  ngOnInit(): void {

    $('#animatedBG').particleground({
      dotColor: '#911F27',
      lineColor: '#911F27'
    });

  }


  submitLoginForm(loginForm:FormGroup){

    if(loginForm.valid){

      this._AuthService.login(loginForm.value).subscribe( (response) => {

        if(response.message == "success"){

          localStorage.setItem('userToken' , response.token)
          
          this._Router.navigate(['homa'])

        }
        else{

          this.error = response.errors.email.message;
          

        }

      })

    }
    
  }


}
