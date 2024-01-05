import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCreationComponent } from './user-creation/user-creation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreditorDetailsComponent } from './creditor-details/creditor-details.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AngularMaterialModule } from '../angular-material-module/angular-material.module';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { IdDetailsComponent } from './id-details/id-details.component';
import { ClaimEmployeComponent } from './claim-employe/claim-employe.component';
import { AddSecurityDetailsComponent } from './add-security-details/add-security-details.component';
import { AddBankDetailsComponent } from './add-bank-details/add-bank-details.component';

let components =[
  UserCreationComponent,
  CreditorDetailsComponent,
  ConfirmationModalComponent,
  IdDetailsComponent,
  ClaimEmployeComponent,
  AddSecurityDetailsComponent,
  AddBankDetailsComponent
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    AngularMaterialModule
  ],
  declarations: components,
  exports:components
})
export class ModelModule { }
