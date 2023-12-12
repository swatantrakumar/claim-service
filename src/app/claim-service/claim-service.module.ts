import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimServiceComponent } from './claim-service.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule
  ],
  declarations: [ClaimServiceComponent]
})
export class ClaimServiceModule { }
