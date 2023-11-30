import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthInterceptor } from '../shared/auth.interceptor';


@NgModule({
    declarations: [
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
