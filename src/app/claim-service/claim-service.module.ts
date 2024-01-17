import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimServiceComponent } from './claim-service.component';
import { CoreModule } from '../core/core.module';
import { AgGridModule } from 'ag-grid-angular';
import { MyClaimComponent } from './my-claim/my-claim.component';
import { FormsModule } from '@angular/forms';
import { Form_cComponent } from './claim_forms/form_c/form_c.component';
import { Form_headerComponent } from './claim_header_footer/form_header/form_header.component';
import { Form_footerComponent } from './claim_header_footer/form_footer/form_footer.component';
import { Form_c_bodyComponent } from './form-body/form_c_body/form_c_body.component';
import { DeclarationComponent } from './claim_header_footer/declaration/declaration.component';
import { VerificationComponent } from './claim_header_footer/verification/verification.component';
import { ModelModule } from '../model/model.module';
import { CommonCoreModule } from './common/common.module';
import { FormBBodyComponent } from './form-body/form-b-body/form-b-body.component';
import { FormDBodyComponent } from './form-body/form-d-body/form-d-body.component';
import { FormCaBodyComponent } from './form-body/form-ca-body/form-ca-body.component';
import { FormFBodyComponent } from './form-body/form-f-body/form-f-body.component';

const components = [
  ClaimServiceComponent,
  MyClaimComponent,
  Form_cComponent,
  Form_headerComponent,
  Form_footerComponent,
  DeclarationComponent,
  VerificationComponent,
  Form_c_bodyComponent,
  FormBBodyComponent,
  FormDBodyComponent,
  FormCaBodyComponent,
  FormFBodyComponent
]

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    AgGridModule,
    ModelModule,
    CommonCoreModule
  ],
  declarations: components
})
export class ClaimServiceModule { }
