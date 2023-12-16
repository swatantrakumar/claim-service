import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErpComponent } from './erp.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ClientMasterComponent } from './client-master/client-master.component';
import { CaseRagistrationComponent } from './case-ragistration/case-ragistration.component';
import { ClaimFormsComponent } from './claim-forms/claim-forms.component';
import { DocumentComponent } from './document/document.component';
import { PermissionsComponent } from './permissions/permissions.component';

const erpRoutes : Routes = [
      { path: '', component: ErpComponent,
          children:[
            { path : 'user-management', component:UserManagementComponent},
            { path : 'client-master', component:ClientMasterComponent},
            { path : 'case-ragistration', component:CaseRagistrationComponent},
            { path : 'claim-forms', component:ClaimFormsComponent},
            { path : 'permissions', component:PermissionsComponent},
            { path : 'document', component:DocumentComponent},
          ]
      }
];



@NgModule({
    imports : [
        RouterModule.forChild(erpRoutes)
        ],
    exports:[
        RouterModule
        ]

})
export class ErpRoutingModule{}
