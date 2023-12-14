import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimServiceComponent } from './claim-service.component';
import { CoreModule } from '../core/core.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    AgGridModule
  ],
  declarations: [ClaimServiceComponent]
})
export class ClaimServiceModule { }
