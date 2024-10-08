import { ViewCommentsComponent } from './view-comments/view-comments.component';
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
import { WaitModelComponent } from './wait-model/wait-model.component';
import { PreviewModelComponent } from './preview-model/preview-model.component';
import { CommonCoreModule } from '../claim-service/common/common.module';
import { ClaimReviewApprovalComponent } from './claim-review-approval/claim-review-approval.component';
import { ClaimFormSubmitModelComponent } from './claim-form-submit-model/claim-form-submit-model.component';

let components =[
  UserCreationComponent,
  CreditorDetailsComponent,
  ConfirmationModalComponent,
  IdDetailsComponent,
  ClaimEmployeComponent,
  AddSecurityDetailsComponent,
  AddBankDetailsComponent,
  WaitModelComponent,
  PreviewModelComponent,
  ClaimReviewApprovalComponent,
  ClaimFormSubmitModelComponent,
  ViewCommentsComponent
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    AngularMaterialModule,
    CommonCoreModule
  ],
  declarations: components,
  exports:components
})
export class ModelModule { }
