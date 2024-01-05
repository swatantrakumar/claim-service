import { Injectable } from '@angular/core';
import { CommonFunctionService } from '../../common-function/common-function.service';
import { NotificationService } from '../../notify/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AddClaimServiceService {

constructor(
  private commonFunctionService:CommonFunctionService,
  private notificationService:NotificationService
) { }

  addClaimObj(claimObj:any,claim_form:any,claimDetails:any){
    if(!claimObj || !claimObj.unitDetails || !claimObj.unitDetails.unit){
      this.notificationService.notify('bg-danger',"Please fill in all the details.. ");
      return
    }
    if(claim_form.formName!=='B'){
        claimObj.paymentDetails=[];
    }else{
        if(!claimObj.paymentDetails || !claimObj.paymentDetails[0] || claimObj.paymentDetails[0].total<=0){
          this.notificationService.notify('bg-danger',"Please fill Amount..");
          return;
        }
    }
    //this.claimObj.paymentDetails[0].otherType=this.claimObj.unitDetails.otherType;
    claimDetails.push(this.commonFunctionService.cloneObject(claimObj));
    claim_form.claimAmountDetails = claimDetails;
    if(claim_form.formName==='B'){
        //this.calculateTotalClaimAmount();
    }else{
        //this.saveClaimForm();
    }
    claimObj={};
    claimObj.unitDetails={}
    claimObj.paymentDetails=[];
  }
  addPaymentDetails(object:any,claimModelWindow:any,payments:any,index:number,claim_form:any,claimDetails:any){
    var mandatoryFields= ['paymentDate','mode','amount']
    switch(claimModelWindow){
      case "CLAIM_MODEL_BANK": mandatoryFields= ['date','mode','total']; break;
      case "CLAIM_MODEL_OPERATIONAL_CREDITOR": mandatoryFields= ['unit','dueDate','total']; break;
      case "CLAIM_MODEL_EMPLOYEE": mandatoryFields= ['dueDate','total']; break;
      case "CLAIM_MODEL_OTHERS": mandatoryFields= ['dueDate','total']; break;
    }

    for(var i=0; i<mandatoryFields.length;i++){
      if(!payments[index][mandatoryFields[i]]){
          this.notificationService.notify('bg-danger',"Please fill all mandatory fields...");
          return;
      }
    }
    payments[index].index= object.paymentDetails.length+1;
    object.paymentDetails.push(this.commonFunctionService.cloneObject(payments[index]));
    payments[index]={};
    this.commonFunctionService.calculateTotalClaimAmount(claimDetails,claim_form);
    claim_form.claimAmountDetails= this.commonFunctionService.cloneObject(claimDetails);

  }
  addPaymentDetailsReview(object:any,claimModelWindow:any,paymentsReview:any,index:number,claim_form:any,claimDetails:any,payments_update_index:number){
    var mandatoryFields= ['paymentDate','mode','amount']
     switch(claimModelWindow){
          case "CLAIM_MODEL_BANK": mandatoryFields= ['date','mode','total']; break;
          case "CLAIM_MODEL_OPERATIONAL_CREDITOR": mandatoryFields= ['unit','dueDate','total']; break;
          case "CLAIM_MODEL_EMPLOYEE": mandatoryFields= ['dueDate','total']; break;
          case "CLAIM_MODEL_OTHERS": mandatoryFields= ['dueDate','total']; break;
      }

      for(var i=0; i<mandatoryFields.length;i++){
          if(!paymentsReview[mandatoryFields[i]]){
              this.notificationService.notify('bg-danger',"Please fill all mandatory fields...");
              return;
          }
      }
      paymentsReview[index]= object.paymentDetails.length+1;
      if(payments_update_index != -1){
          object.paymentDetails[payments_update_index] = this.commonFunctionService.cloneObject(paymentsReview)
          payments_update_index = -1;
      }else{
          object.paymentDetails.push(this.commonFunctionService.cloneObject(paymentsReview));
      }
      paymentsReview={};
      this.commonFunctionService.calculateTotalClaimAmount(claimDetails,claim_form);
      claim_form.claimAmountDetails= this.commonFunctionService.cloneObject(claimDetails);
  }

}
