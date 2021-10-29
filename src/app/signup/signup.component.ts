import { Component, OnInit } from '@angular/core';

import { FormGroup , FormControl , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

declare var $ :any


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  error : string = '';

  registerForm:FormGroup = new FormGroup({

    first_name : new FormControl(null , [ Validators.required , Validators.minLength(3) , Validators.maxLength(8)]),
    last_name : new FormControl(null , [ Validators.required , Validators.minLength(3) , Validators.maxLength(8)]),
    age : new FormControl(null , [ Validators.required , Validators.min(16) , Validators.max(80)]),
    email : new FormControl(null , [ Validators.required ,Validators.email]),
    password : new FormControl(null , [ Validators.required , Validators.pattern(`^[A-Z][a-z]{2,8}$`)]),

  })

  isClicked = false;
  responseMsg = "";
  isError = false;

  constructor( public _AuthService : AuthService  , public _Router : Router) { }

  ngOnInit(): void {

    $('#animatedBG').particleground({
      dotColor: '#911F27',
      lineColor: '#911F27'
    });

    if(this._AuthService.isLoggedIn()){
      this._Router.navigate(['homa'])
    }

  }

  submitRegisterForm(registerForm:FormGroup){

    this.isClicked = true

    if(registerForm.valid){

      this._AuthService.register(registerForm.value).subscribe( (response) => {

        if(response.message == "success"){

          this.isClicked = false;

          this.registerForm.reset()

          this.responseMsg = response.message;

          $(".text-success").show(0)

          setTimeout(function(){ $(".text-success").hide(500); }, 3000);

          // this._Router.navigate(['signin'])

        }
        else{

          this.error = response.errors.email.message;

          $(".error").show(0)

          setTimeout(function(){ $(".error").hide(500); }, 3000);

          this.isClicked = false;
          

        }

      })

    }
    
  }

  

}
