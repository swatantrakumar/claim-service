import { Injectable } from '@angular/core';
import { CommonFunctionService } from '../../common-function/common-function.service';
import { ModelService } from '../../model/model.service';
import { DataShareService } from '../../data-share-service/data-share.service';

@Injectable({
  providedIn: 'root'
})
export class DeleteRecordService {
constructor(
  private commonFunctionService:CommonFunctionService,
  private modelService:ModelService,
  private dataShareService:DataShareService
) { }
  deleteRecord(object:any,claim_form:any){
    let message = this.commonFunctionService.getConfirmationMessageForClaimRecord(object,claim_form);
    let obj ={
      msg : message
    }
    this.modelService.open('confirmation_modal',obj)
  }
}
