import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCreationComponent } from './user-creation/user-creation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreditorDetailsComponent } from './creditor-details/creditor-details.component';

let components =[
  UserCreationComponent,
  CreditorDetailsComponent
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: components,
  exports:components
})
export class ModelModule { }
