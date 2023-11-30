import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthInterceptor } from '../shared/auth.interceptor';
import { AuthComponent } from './auth.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';


@NgModule({
    declarations: [
      AuthComponent,
      SigninComponent,
      SignupComponent
    ],
    imports: [
        AuthRoutingModule    ],
    exports: [

    ],
    providers:[
      { provide : HTTP_INTERCEPTORS,useClass : AuthInterceptor, multi: true}

      ]

})
export class AuthModule {

}
