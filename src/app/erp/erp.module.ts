import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErpComponent } from './erp.component';
import { ErpRoutingModule } from './erp-routing.module';
import { CoreModule } from '../core/core.module';
import { ModelModule } from '../model/model.module';
import { UserManagementComponent } from './user-management/user-management.component';
import { CaseRagistrationComponent } from './case-ragistration/case-ragistration.component';
import { ClaimFormsComponent } from './claim-forms/claim-forms.component';
import { ClientMasterComponent } from './client-master/client-master.component';
import { DocumentComponent } from './document/document.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ErpRoutingModule,
    CoreModule,
    ModelModule,
    AgGridModule,
    FormsModule
  ],
  declarations: [
    ErpComponent,
    UserManagementComponent,
    CaseRagistrationComponent,
    ClaimFormsComponent,
    ClientMasterComponent,
    DocumentComponent,
    PermissionsComponent
  ]
})
export class ErpModule { }
