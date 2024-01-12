import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditorInformationComponent } from './creditor-information/creditor-information.component';
import { IrpInformationComponent } from './irp-information/irp-information.component';
import { Id_detailsComponent } from './id_details/id_details.component';
import { AddressInformationComponent } from './address-information/address-information.component';
import { Claim_amount_with_unit_detailsComponent } from './claim_amount_with_unit_details/claim_amount_with_unit_details.component';
import { Claim_amount_with_bank_nbfcComponent } from './claim_amount_with_bank_nbfc/claim_amount_with_bank_nbfc.component';
import { SecurityDetailsComponent } from './securityDetails/securityDetails.component';
import { BankDetailsComponent } from './bankDetails/bankDetails.component';

import { Preview_bodyComponent } from './preview_body/preview_body.component';
import { Preview_declarationComponent } from './preview_declaration/preview_declaration.component';
import { Preview_footerComponent } from './preview_footer/preview_footer.component';
import { Preview_headerComponent } from './preview_header/preview_header.component';
import { Preview_verificationComponent } from './preview_verification/preview_verification.component';


const components = [
  CreditorInformationComponent,
  IrpInformationComponent,
  Id_detailsComponent,
  AddressInformationComponent,
  Claim_amount_with_unit_detailsComponent,
  Claim_amount_with_bank_nbfcComponent,
  SecurityDetailsComponent,
  BankDetailsComponent,
  Preview_bodyComponent,
  Preview_declarationComponent,
  Preview_footerComponent,
  Preview_headerComponent,
  Preview_verificationComponent
]

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: components,
  exports:components
})
export class CommonCoreModule { }
