import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClaimServiceComponent } from './claim-service.component';

const claimRoutes : Routes = [
  {path: 'mclaimn', component: ClaimServiceComponent}
];



@NgModule({
    imports : [
        RouterModule.forChild(claimRoutes)
        ],
    exports:[
        RouterModule
        ]

})
export class ClaimRoutingModule{

}
