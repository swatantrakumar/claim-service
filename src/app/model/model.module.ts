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
import { ClaimModalBankComponent } from './claim-modal-bank/claim-modal-bank.component';
import { HomeBuyerComponent } from './home-buyer/home-buyer.component';
import { HomeBuyerReviewComponent } from './home-buyer-review/home-buyer-review.component';
import { OperationalCreditorComponent } from './operational-creditor/operational-creditor.component';
import { OthersModelComponent } from './others-model/others-model.component';

let components =[
  UserCreationComponent,
  CreditorDetailsComponent,
  ConfirmationModalComponent,
  IdDetailsComponent,
  ClaimEmployeComponent,
  ClaimModalBankComponent,
  HomeBuyerComponent,
  HomeBuyerReviewComponent,
  OperationalCreditorComponent,
  OthersModelComponent
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
