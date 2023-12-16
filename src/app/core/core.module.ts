import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { FormsModule } from '@angular/forms';
import { CaseSearchComponent } from './case-search/case-search.component';

let component = [
  FooterComponent,
  HeaderComponent,
  UserAccountComponent,
  CaseSearchComponent
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:component,
  declarations: component
})
export class CoreModule { }
