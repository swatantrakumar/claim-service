import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErpComponent } from './erp.component';
import { ErpRoutingModule } from './erp-routing.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    ErpRoutingModule,
    CoreModule
  ],
  declarations: [ErpComponent]
})
export class ErpModule { }
