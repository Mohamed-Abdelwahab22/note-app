import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomaComponent } from './homa/homa.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
{path : "" , redirectTo:"signup" , pathMatch :"full"},
{path : "signup" , component : SignupComponent},
{path : "signin" , component : SigninComponent},
{path : "homa" , canActivate : [AuthGuard] , component : HomaComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
