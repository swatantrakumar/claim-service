import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { RestPassComponent } from './rest-pass/rest-pass.component';
import { NewPassComponent } from './new-pass/new-pass.component';

const authRoutes : Routes = [
  {path: '', component: AuthComponent, children:[
    { path : 'signin', component:SigninComponent},
    { path : 'signup', component:SignupComponent},
    { path : 'rest-pass', component:RestPassComponent},
    { path : 'new-pass/:key1/:key2/:key3', component:NewPassComponent}
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
