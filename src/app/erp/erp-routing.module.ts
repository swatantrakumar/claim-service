import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErpComponent } from './erp.component';

const erpRoutes : Routes = [
  {path: 'mclr', component: ErpComponent}
];



@NgModule({
    imports : [
        RouterModule.forChild(erpRoutes)
        ],
    exports:[
        RouterModule
        ]

})
export class ErpRoutingModule{

}
