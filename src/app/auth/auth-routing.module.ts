import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const authRoutes : Routes = [
  {path: '', component: AuthComponent, children:[
    { path : 'signin', component:SigninComponent},
    {path : 'signup', component:SignupComponent}
  ]}
];



@NgModule({
    imports : [
        RouterModule.forChild(authRoutes)
        ],
    exports:[
        RouterModule
        ]

})
export class AuthRoutingModule{

}
