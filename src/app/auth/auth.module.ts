import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthInterceptor } from '../shared/auth.interceptor';
import { AuthComponent } from './auth.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { RestPassComponent } from './rest-pass/rest-pass.component';
import { NewPassComponent } from './new-pass/new-pass.component';
import { CommonModulesModule } from '../common-modules/common-modules.module';


@NgModule({
    declarations: [
      AuthComponent,
      SigninComponent,
      SignupComponent,
      RestPassComponent,
      NewPassComponent
    ],
    imports: [
        AuthRoutingModule,
        CommonModulesModule
      ],
    exports: [

    ],
    providers:[
      { provide : HTTP_INTERCEPTORS,useClass : AuthInterceptor, multi: true}

      ]

})
export class AuthModule {

}
