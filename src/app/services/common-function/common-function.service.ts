import { Injectable } from '@angular/core';
import { StorageService } from '../storage-service/storage.service';
import { ApiService } from '../api-service/api.service';
import { ModelService } from '../model/model.service';
import { NotificationService } from '../notify/notification.service';
import { EnvService } from '../env-service/env.service';
@Injectable({
  providedIn: 'root'
})
export class CommonFunctionService {

constructor(
  private storageService:StorageService,
  private apiService:ApiService,
  private modelService:ModelService,
  private notificationService:NotificationService,
  private envService:EnvService
) { }

getPayload(obj:any){
  let payload = {
    path : obj.orderBy,
    data :{
      log:this.storageService.getUserLog(),
      key:this.storageService.getUserAppId(),
      key2:this.storageService.getRefCode(),
      key3:this.storageService.GetActiveCaseId(),
      pageNo:(obj.pageNo-1),
      pageSize:obj.pageSize,
      value:obj.value
    }
  }
  return payload;
}

  isValidAlphaNumeric(inputValue:any){
    var pattern = /^[a-z0-9]+$/i;
    return (pattern.test(inputValue) ? true : false);
   
  }  
  isValidName(inputValue:any){
    var pattern = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;
    return (pattern.test(inputValue) ? true : false);
  }  
  isValidEmail(inputValue:any) {
    var pattern = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    return (pattern.test(inputValue) ? true : false);
  }
  isValidZipCode(inputValue:any) {
    var pattern = /^[0-9]{1}[0-9]{5}$/;
    return (pattern.test(inputValue) ? true : false);
  }
    isValidPhone(inputValue:any){
        var pattern =/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
        return (pattern.test(inputValue) ? true : false);
        
}

  cloneObject(obj:any) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
  }
  checkEmailExistedOrNot(email:string){
    var dataObj = {
        "case_id": this.storageService.GetActiveCaseId(),
        "creditors": [{
            "email" : email
        }]
    }
    this.apiService.checkEmailExist(dataObj)
  }
  removeSpecialCharacters(inputString:string) {
    if (inputString && inputString !== '') return inputString.replace(/[^a-z\d]+/gi, '');
      return '';
  };
  setClientLog(object:any){
    object['log'] = this.storageService.getUserLog();
  }
  setBaseEntity(object:any){
    if (object) {
      if (!object.createdDate || !object.createdBy || object.createdBy === null) {
          if (this.storageService.getUserId()) {
              object.createdBy = this.storageService.getUserId();
          }
        } else {
            if (this.storageService.getUserId()) {
                object.updatedBy = this.storageService.getUserId();
            }
        }
    }
  }
  getConfirmationMessageForClaimRecord(object:any,claim_form:any){
    var message = "Are you sure you want to delete claim of "+ object.unitDetails.unit + "," + object.unitDetails.type + ", Amount:" + object.total +" ?" ;
     switch(claim_form.claimModel){
        case "OTHERS" :
           message = "Are you sure you want to delete claim of "+ object.unitDetails.unit + ", Amount:" + object.total +" ?" ;
     }
      return message ;
  }
  calculateInterest(object:any, claim_form:any){
    if(claim_form.commencementDate && (object.paymentDate || object.dueDate) && claim_form.calculateInterestAmount){
        var commencementTime:any = new Date(claim_form.commencementDate).getTime();
        var paymentTime:any = new Date(object.dueDate?object.dueDate:object.paymentDate).getTime();
        var days = parseInt((commencementTime - paymentTime)/(1000 * 60 * 60 * 24) + '');
        if(days>0){
            var interest = parseFloat(parseFloat(object.amount)/100 * (claim_form.interestRate * days/365) + '').toFixed(2);
            object.interest = interest;
        }else{
            object.interest=0;
        }
    }
    object.amount=this.validateNumber(object.amount,'positivedec')
    object.interest=this.validateNumber(object.interest,'positivedec')
    object.penalty=this.validateNumber(object.penalty,'positivedec')
    if(!object.amount) object.amount=0;
    if(!object.interest) object.interest=0;
    if(!object.penalty) object.penalty=0;
    object.amount=parseFloat(object.amount);
    object.interest=parseFloat(object.interest);
    object.penalty=parseFloat(object.penalty);

    if(object.amount && (object.amount>0 || object.interest>0 || object.penalty>0)){
        object.total =parseFloat(parseFloat(object.interest) + parseFloat(object.amount) + parseFloat(object.penalty) + '').toFixed(2)
    }else{
        object.total =0;
    }
  }
  validateNumber(value:any, fType:any) {
    if (value) {
        let regex:any;
        switch (fType.toLowerCase()) {
            case 'time':
                regex = [];
                regex.push(/^([0-2])$/);
                regex.push(/^(0[0-9]|1[0-9]|2[0-3])$/);
                regex.push(/^(0[0-9]|1[0-9]|2[0-3]):$/);
                regex.push(/^(0[0-9]|1[0-9]|2[0-3]):[0-5]$/);
                regex.push(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/);
                if (value) {
                    if (value.length > 5) {
                        value = value.substring(0, 5);
                    }
                    if (value.length >= 1) {
                        if (regex[value.length - 1].test(value)) {
                            return value
                        } else {
                            return value.slice(0, -1);
                        }
                    }
                }
                break;
            case 'anydec':
                regex = /^(-{1}?(?:([0-9]{0,10}))|([0-9]{1})?(?:([0-9]{0,9})))?(?:\.([0-9]{0,3}))?$/;
                if (regex.test(value)) {
                    return value
                } else {
                    value = value.slice(0, -1);
                    return value
                }
            case 'negativedec':
                regex = /^(-{1}?(?:([0-9]{0,10})))/;
                if (regex.test(value)) {
                    return value
                } else {
                    value = value.slice(0, -1);
                    return value
                }
            case 'positivedec':
                regex = /^\d{0,10}(\.\d{0,2})?$/;
                if (regex.test(value)) {
                    return value
                } else {
                    value = value.slice(0, -1);
                    return value
                }
            case 'negativeint':
                if (value.length > 1) {
                    if (parseFloat(value) < 0) {
                        value = parseInt(value);
                        return value;
                    } else {
                        return "";
                    }
                } else {
                    return value
                }
            case 'positiveint':
                regex = /^[1-9]\d*$/;
                if (regex.test(value)) {
                    return value
                } else {
                    value = value.slice(0, -1);
                    return value
                }
            case 'mobile':
                if (value && value.length < 10) {
                    regex = /^[0]?[789]\d*$/;
                    if (regex.test(value)) {
                        return value
                    } else {
                        value = value.slice(0, -1);
                        return value
                    }
                } else {
                    regex = /^[7-9][0-9]{9}$/;
                    if (regex.test(value)) {
                        return value
                    } else {
                        value = value.slice(0, -1);
                        return value
                    }
                }
            case 'anyint':
                value = value.replace(/[^\d/-]/g, '');
                if (value === '-') {
                    return value;
                } else {
                    return parseInt(value);
                }
            case 'intwhsl':
                regex = /[1-9]\d*$/;
                if (regex.test(value)) {
                    return value
                } else {
                    value = value.slice(0, -1);
                    return value
                }
            case 'expirydate':
                value = value.replace(/[^\d]/g, '');
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, value.length)
                    if (!(parseInt(value) >= 1 && parseInt(value) <= 12)) {
                        value = value.substring(0, 2);
                    }
                    if (value.length === 5) {
                        value = this.validateExpiryDate(value);
                    }
                    return value;
                } else {
                    return value;
                }
                break;
            case 'porrvalue':
                regex = /^[RrTt]/;
                if (regex.test(value)) {
                    return value
                } else {
                    value = "";
                    return value
                }
            case 'userid':
                if (value) {
                    value = value.replace(' ', '');
                    return value;
                }
                break;
        }
    }
  }
  validateExpiryDate(value:any) {
    var financialYearEndDate = new Date("31 March" + parseInt((this.getFinancialYear() + 10) + ''));
    var todayDate = new Date();

    var parts:any = value.split('/');
    var enteredDate = new Date(20 + parts[1], parts[0] - 1, 1);
    if (enteredDate >= todayDate && enteredDate <= financialYearEndDate) {
        return value;
    } else {
        return value.substring(0, 3);
    }
  }
  getFinancialYear() {
      var todayDate = new Date();
      var month = todayDate.getMonth() + 1;
      if (month <= 3) return todayDate.getFullYear() - 1;
      return todayDate.getFullYear();

  }
  isHomeBuyer(claim_form:any){
    return claim_form && claim_form.catClass && claim_form.catClass.indexOf('Home Buyers')>-1
  }

  claimModelPopUp(claim_form:any,claimDetails:any,payments:any,activeTabName:any,claimModelWindow:any,claimObj:any){
    //$scope.payments_update_index = -1;
    if(!claim_form.claimAmountDetails) claim_form.claimAmountDetails = [];
     claimDetails = this.cloneObject(claim_form.claimAmountDetails);
     payments=[];
     if(claimObj.paymentDetails && claimObj.paymentDetails.length == 0) claimObj.paymentDetails=[{}];
     if(!claimObj.paymentDetails) claimObj['paymentDetails']=[{}]
     //paymentsReview = {}
     for(var i=0;i<claimDetails.length;i++){
         payments.push({});
     }
     switch(claim_form.catClass){
       case 'Home Buyers':
           if(activeTabName == 'REVIEWAPPROVAL'){
             claimModelWindow="CLAIM_MODEL_HOME_BUYER_FOR_REVIEW";
           }
           else{
             claimModelWindow="CLAIM_MODEL_HOME_BUYER";
           }

          claim_form.claimModel = "HOME_BUYER";
          this.calculateTotalClaimAmount(claimDetails,claim_form);
          break;
       case 'Home Buyers(Authorised Rep)':
       case 'Commercial Buyer':
       case 'Commercial Buyer(Authorised Rep)':
          claimModelWindow="CLAIM_MODEL_HOME_BUYER";
          claim_form.claimModel = "HOME_BUYER";
          this.calculateTotalClaimAmount(claimDetails,claim_form);
          break;
       case 'Banks':
       case 'NBFC':
       case 'Banks(Authorised Rep)':
       case 'NBFC(Authorised Rep)':
          claimModelWindow="CLAIM_MODEL_BANK";
          claim_form.claimModel = "BANK_NBFC";
          break;
       case 'Operational Creditor':
          claimModelWindow="CLAIM_MODEL_OPERATIONAL_CREDITOR";
          claim_form.claimModel = "OPERATIONAL";
          break;
       case 'Others':
          claimModelWindow="CLAIM_MODEL_OTHERS";
          claim_form.claimModel = "OTHERS";
          break;
       case 'Employee & Workmen':
          if(!claim_form.creditors){
            this.notificationService.notify('bg-danger','Please fill creditor details.. ');
             // $.notify("Please fill creditor details.. ","error");
          }
          claimObj.unitDetails['name']=claim_form.creditors[0].name;
          claimModelWindow="CLAIM_MODEL_EMPLOYEE";
          claim_form.claimModel = "EMPLOYEE";
          break;
       case 'Employee & Workmen(Authorised Rep)':
          claimModelWindow="CLAIM_MODEL_EMPLOYEE";
          claim_form.claimModel = "EMPLOYEE";
          break;
     }
     this.modelService.open('CLAIM_MODEL_EMPLOYEE',{claimModelWindow:claimModelWindow,payments:payments,claimObj:claimObj});
  }
  calculateTotalClaimAmount(claimDetails:any,claim_form:any){
      var total:any=0;
      var amount:any=0;
      var interest:any=0;
      var penalty:any=0;
      var tax:any=0;
      claimDetails.forEach((claim:any) => {
        var unitTotal:any = 0;
        var unitAmount:any=0;
        var unitInterest:any=0;
        var unitPenalty :any=0;
        var unitTax:any =0;
        if(claim.paymentDetails && claim.paymentDetails.length>0){
          claim.paymentDetails.forEach((payment:any) => {
                    this.calculateInterest(payment,claim_form);
                    total = total + parseFloat(payment.total);
                    amount = amount + parseFloat(payment.amount);
                    tax = tax + parseFloat(payment.tax);
                    interest = interest + parseFloat(payment.interest);
                    penalty = penalty + parseFloat(payment.penalty)
                    unitTotal = parseFloat(unitTotal) + parseFloat(payment.total);
                    unitAmount = parseFloat(unitAmount) + parseFloat(payment.amount);
                    unitTax = parseFloat(unitTax) + parseFloat(payment.tax);
                    unitInterest = parseFloat(unitInterest) + parseFloat(payment.interest);
                    unitPenalty = parseFloat(unitPenalty) + parseFloat(payment.penalty);
            })
        }
        claim.total = parseFloat(unitTotal).toFixed(2);
        claim.amount=parseFloat(unitAmount).toFixed(2);
        claim.tax=parseFloat(unitTax).toFixed(2);
        claim.interest=parseFloat(unitInterest).toFixed(2);
        claim.penalty=parseFloat(unitPenalty).toFixed(2);
      })
      claim_form.claimAmountDetails= claimDetails;
      claim_form.total = parseFloat(total).toFixed(2);
      claim_form.amount=parseFloat(amount).toFixed(2);
      claim_form.tax=parseFloat(tax).toFixed(2);
      claim_form.interest=parseFloat(interest).toFixed(2);
      claim_form.penalty=parseFloat(penalty).toFixed(2);
      this.saveClaimForm(claim_form);
  }

  saveClaimForm(claim_form:any,submit?:any){
    if(this.removeSpecialCharacters(claim_form.formType) ===""){
      claim_form.formType = "USER_CLAIM";
    }
    claim_form.verifiedLocation=claim_form.place; 
    var x = claim_form.primaryClaimant;
    claim_form['userId'] = this.storageService.getUserId();
    if(claim_form.claimAmountDetails){
      for(var i=0;i<claim_form.claimAmountDetails.length;i++){
        claim_form.claimAmountDetails[i].type=claim_form.claimAmountDetails[i].unitDetails.type;
        claim_form.claimAmountDetails[i].unit=claim_form.claimAmountDetails[i].unitDetails.unit;
        claim_form.claimAmountDetails[i].comment=claim_form.claimAmountDetails[i].unitDetails.comment;
        claim_form.claimAmountDetails[i].otherType=claim_form.claimAmountDetails[i].unitDetails.otherType;

      }
    }
    if(claim_form.category=='EC'){
      claim_form.claimModel='EMPLOYEE';
    }
    if(submit && submit==='SUBMIT'){
      if(this.isHomeBuyer(claim_form) && this.storageService.isArMandatory()){
        if(claim_form ||  claim_form.authorised_person || claim_form.authorised_person.trim().length == 0){
          this.notificationService.notify('bg-danger',"Please Add Authorised Representative");
          return;
        }
      }
      claim_form.formStatus = "SUBMITTED";
      if(!claim_form.claimDate) claim_form.claimDate = new Date();
    }else if(claim_form.formStatus === "SUBMITTED"){
      //DO NOT CHANGE STATUS
    }else{
      claim_form.formStatus = "SAVED";
    }
    this.setClientLog(claim_form);
    this.setBaseEntity(claim_form);
    let payload = {
      path : "claimform",
      data : claim_form,
      type : submit
    }
    this.apiService.saveNewClaim(payload);
  }
  getProjectMode() {
    var mode = "c";
    return mode;
  }
  reformatDates(objectName:any, object:any) {
    if (objectName && object) {
        switch (objectName) {
            case 'valuer':
                if (object.demitDate) object.demitDate = new Date(object.demitDate);
                if (object.appointmentDate) object.appointmentDate = new Date(object.appointmentDate);
                if (object.appointmentDate) object.cocApprovalDate = new Date(object.cocApprovalDate);
                break;
            case 'litigation':
                if (object.lastHearing) object.lastHearing = new Date(object.lastHearing);
                if (object.nextHearing) object.nextHearing = new Date(object.nextHearing);
                if (object.initiationDate) object.initiationDate = new Date(object.initiationDate);
                break;
            case 'claim':
                if (object.receiptClaimDate) object.receiptClaimDate = new Date(object.receiptClaimDate);
                break;
            case 'vote':
                if (object.stDate) object.stDate = new Date(object.stDate);
                if (object.endDate) object.endDate = new Date(object.endDate);
                break;
            case 'case':
                if (object.creationDate) object.creationDate = new Date(object.creationDate);
                if (object.initiationDate) object.initiationDate = new Date(object.initiationDate);
                if (object.submissionDate) object.submissionDate = new Date(object.submissionDate);
                if (object.admissionDate) object.admissionDate = new Date(object.admissionDate);
                if (object.irpAppointementDate) object.irpAppointementDate = new Date(object.irpAppointementDate);
                if (object.insolvency_commencement_date) object.insolvency_commencement_date = new Date(object.insolvency_commencement_date);
                if (object.liquidation_commencement_date) object.liquidation_commencement_date = new Date(object.liquidation_commencement_date);
                if (object.bankruptcy_commencement_date) object.bankruptcy_commencement_date = new Date(object.bankruptcy_commencement_date);
                break;
            case 'bankaccount':
                if (object.date) object.date = new Date(object.date);
                break;
            case 'userservice':
                if (object.endDate) object.endDate = new Date(object.endDate);
                /* if(object.startDate) object.startDate=new Date(object.startDate);*/
                break;
            case 'claims':
                if (object.date) object.date = new Date(object.date);
                /* if(object.startDate) object.startDate=new Date(object.startDate);*/
                break;
            case 'claimform':
                if (object.claimDate) object.claimDate = new Date(object.claimDate);
        }
    }
}
  getClaimDataFormCaseId(id:string){
    let log = this.storageService.getUserLog();
    let payload = {
      _id : id,
      data: {log:log}
    }
    this.apiService.getClaimData(payload);
  }
  getClaimStaticDataForTheCase(id:string){
    let payload = {
      _id : id
    }
    this.apiService.getClaimStaticDataFromCase(payload);
  }
  getNewCriteriaAsString(field:any, op:any, val:any, sortBy?:any) {
    var criteria:any = {};
    criteria.criteria = field + ";" + op;
    if (sortBy) {
        criteria.criteria = criteria.criteria + ";" + sortBy
    }
    criteria.value = val
    return criteria;
  }
  populateSeacrchCriteriaAndSendCall(colName:any, criteria:any, onlineOffline:any, ignoreCase:any, pageNo:any, pageSize:any) {
      let payload = {
        path:"",
        data : {}
      }
      let varUrl = this.envService.getAuthApi('GET_STATIC_DATA');
      if (onlineOffline) {
          varUrl = this.envService.getAuthApi('GET_STATIC_DATA_CLAIM');
      }
      if (colName === 'purchaseorder') {
        varUrl = this.envService.getAuthApi('GET_PURCHAGE_ORDER');
      }
      var orderBy = '';
      var kvp:any = {};
      let activeUser = this.storageService.GetUserInfo();
      kvp.key = activeUser.refCode;
      if (activeUser) {
          kvp.key2 = activeUser.appId;
      }

      kvp.value = colName;
      kvp.key3 = this.storageService.GetActiveCaseId();;
      kvp.crList = [];
      if (pageNo) {
          kvp.pageNo = pageNo;
      }
      if (pageSize) {
          kvp.pageSize = pageSize;
      }
      this.setClientLog(kvp);
      if (criteria && criteria.searchCriteria && criteria.searchCriteria.length > 0) {
          for (var i = 0; i < criteria.searchCriteria.length; i++) {
              if (!criteria.searchCriteria[i].value) criteria.searchCriteria[i].value = '';
              var newCriteria:any = {}
              var sField = criteria.searchCriteria[i].criteria.split(';');
              newCriteria.fName = sField[0];
              newCriteria.operator = sField[1];

              if (sField.length >= 2) orderBy = sField[2];
              if (newCriteria.operator === 'stw' || newCriteria.operator === 'cnts') {
                  newCriteria.fValue = criteria.searchCriteria[i].value.replace(/[^a-z\d]+/gi, ':');
              } else if (newCriteria.fName == 'quantity' && newCriteria.operator === 'neq') {
                  newCriteria.fValue = 0;
              } else {
                  newCriteria.fValue = criteria.searchCriteria[i].value
              }
              if (ignoreCase) {
                  newCriteria.fValue = newCriteria.fValue;
              } else {
                  if (newCriteria.fValue) {
                      newCriteria.fValue = newCriteria.fValue.toUpperCase();
                  }
              }
              kvp.crList.push(newCriteria);
          }
      }
      if (criteria && criteria.searchTCriteria) {
          for (var i = 0; i < criteria.searchTCriteria.length; i++) {
              kvp.crList.push(criteria.searchTCriteria[i]);
          }
      }
      if (orderBy !== '') {
          varUrl = varUrl + "/" + orderBy;
      }
      payload.path=varUrl;
      payload.data=kvp;
      return payload;
  }

}
