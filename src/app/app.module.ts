import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HashLocationStrategy, Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ClaimRoutingModule } from './claim-service/claim-routing.module';
import { CoreModule } from './core/core.module';
import { ClaimServiceModule } from './claim-service/claim-service.module';
import { ErpModule } from './erp/erp.module';
import { ModelModule } from './model/model.module';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ClaimRoutingModule,
    AuthModule,
    ClaimServiceModule,
    CoreModule,
    ErpModule,
    ModelModule
  ],
  providers: [
    Location,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ]

})
export class AppModule { }
