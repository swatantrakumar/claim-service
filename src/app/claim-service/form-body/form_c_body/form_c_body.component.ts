import { KeyValue } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CommonFunctionService } from 'src/app/services/common-function/common-function.service';
import { ModelService } from 'src/app/services/model/model.service';
import { NotificationService } from 'src/app/services/notify/notification.service';
import { StorageService } from 'src/app/services/storage-service/storage.service';

@Component({
  selector: 'app-form_c_body',
  templateUrl: './form_c_body.component.html',
  styleUrls: ['./form_c_body.component.css']
})
export class Form_c_bodyComponent implements OnInit {
  @Input() claim_form:any
  @Input() claimObj:any;
  @Input() showIdDetails: boolean = false;
  @Input() showCinDetails:boolean = false;
  @Input() claimModeByClass:boolean=false;
  @Input() claimModeByBank:boolean=false;
  @Input() selectedForm:string='';
  @Input() activeTabName:string='';
  activecase:any;
  CIN_NO:boolean=false;
  fcIdentificationDetails:any=[];



  list_of_files_to_attach_for_banks = {
      claim_form:'Claim Form',
      identification_document:'Identification Documents',
      copy_of_agreement:'Copy of Agreement',
      allotment_letter:'Allotment Letter Upload',
      proof_of_payments:'Proof of Payments',
      calculation_of_claim_amount:'Calculation of Claim Amount',
      security_details:'Security details',
      other:'Other'
  }
  alphabates = 'abcdefghijklmnopqrstuvwxyz';
  constructor(
    private storageService:StorageService,
    private modelService:ModelService,
    private commonFunctionService:CommonFunctionService,
    private notificationService:NotificationService
  ) {
    this.activecase = this.storageService.GetActiveCase();
   }

  ngOnInit() {
  }

  getSelectedFilenameForUpload(){

  }
  getSelectedFilenameForUploadcustom(index:any){
    if(this.uploadData || this.uploadData && this.uploadData.length>0){
      var fullId = 'inputGroupFile04_'+index
      if(this.uploadData && this.uploadData.length > 0 && fullId == this.uploadData[0].id){
          if(!this.uploadData || this.uploadData.length==0){
              return " Choose File ";
          }else if(this.uploadData.length==1){
              return this.uploadData[0].fileName;
          }else {
              return this.uploadData.length + " Files" ;
          }

      }
      else{
          return " Choose File "
      }
    }
    else{
        return " Choose File "
    }
  }
  rxFiles:any = [];
  rxid:string='';
  uploadData:any=[]
  fileTypes:any={}
  activeNode:any='';
  fileName:string='';
  setFiles(event:any, fileType:string) {
      this.activeNode = this.claim_form.myPath;
      this.fileTypes[fileType] = [];
      this.uploadData=[];
      this.rxid = event.target.id;
      var files = event.target.files;
      this.fileName = files[0].name;
      for (var i = 0; i < files.length; i++) {
          var file = files[i];
          this.rxFiles.push(file);
          var reader = new FileReader();
          reader.onload = this.imageIsLoaded;
          reader.readAsDataURL(file);
      }
    //this.fileTypes[fileType] = CommonUtilService.cloneObject(this.rxFiles);
  }
  rx:any = {};
  imageIsLoaded= (e:any) => {
    var rxFile = this.rxFiles[0];
    this.rxFiles.splice(0, 1);
    this.rx = {};
    this.rx.fileData = e.target.result;
    this.rx.fileData = this.rx.fileData.split(',')[1];
    if (rxFile.name && rxFile.name != '') {
        this.rx.fileName = rxFile.name;
        this.rx.id = this.rxid;
        var splits = this.rx.fileName.split('.');
        this.rx.fileExtn = splits[splits.length-1];
        this.rx.innerBucketPath = this.activeNode.key+ "/"+this.rx.fileName;
    } else {
        this.rx.fileName = rxFile.webkitRelativePath;
    }
    this.rx.size = rxFile.size;
    this.uploadData.push(this.rx);

  }
  idVerificationWindow(){
    if(!this.claim_form) this.claim_form= {}
    this.fcIdentificationDetails = this.claim_form.ids;
    switch(this.claim_form.catClass){
      case 'Banks':
      case 'Banks(Authorised Rep)':
      case 'NBFC':
      case 'NBFC(Authorised Rep)':
      case 'Operational Creditor':
      case 'Others':
        this.CIN_NO = true;
        this.modelService.open("ID_DETAILS_WINDOW",{});
        break;
      case 'Home Buyers':
      case 'Home Buyers(Authorised Rep)':
      case 'Commercial Buyer(Authorised Rep)':
      case 'Commercial Buyer':
      case 'Employee & Workmen':
      case 'Employee & Workmen(Authorised Rep)':
        this.CIN_NO = false;
        this.modelService.open("ID_DETAILS_WINDOW",{});
        break;
    }

  }
  claimDetails:any=[]
  payments:any=[]
  paymentsReview:any=[];
  claimModelWindow:string='';
  claimModelPopUp(){
    //$scope.payments_update_index = -1;
    if(!this.claim_form.claimAmountDetails) this.claim_form.claimAmountDetails = [];
     this.claimDetails = this.commonFunctionService.cloneObject(this.claim_form.claimAmountDetails);
     this.payments=[];
     this.paymentsReview = {}
     for(var i=0;i<this.claimDetails.length;i++){
         this.payments.push({});
     }
     switch(this.claim_form.catClass){
       case 'Home Buyers':
           if(this.activeTabName == 'REVIEWAPPROVAL'){
             this.modelService.open('CLAIM_MODEL_HOME_BUYER_FOR_REVIEW',{});
             this.claimModelWindow="CLAIM_MODEL_HOME_BUYER_FOR_REVIEW";
           }
           else{
             this.modelService.open('CLAIM_MODEL_HOME_BUYER',{});
             this.claimModelWindow="CLAIM_MODEL_HOME_BUYER";
           }

          this.claim_form.claimModel = "HOME_BUYER";
          //$scope.calculateTotalClaimAmount();
          break;
       case 'Home Buyers(Authorised Rep)':
       case 'Commercial Buyer':
       case 'Commercial Buyer(Authorised Rep)':
          this.claimModelWindow="CLAIM_MODEL_HOME_BUYER";
          this.modelService.open('CLAIM_MODEL_HOME_BUYER',{});
          this.claim_form.claimModel = "HOME_BUYER";
          //$scope.calculateTotalClaimAmount();
          break;
       case 'Banks':
       case 'NBFC':
       case 'Banks(Authorised Rep)':
       case 'NBFC(Authorised Rep)':
          this.claimModelWindow="CLAIM_MODEL_BANK";
          this.modelService.open('CLAIM_MODEL_BANK',{});
          this.claim_form.claimModel = "BANK_NBFC";
          break;
       case 'Operational Creditor':
          this.claimModelWindow="CLAIM_MODEL_OPERATIONAL_CREDITOR";
          this.modelService.open('CLAIM_MODEL_OPERATIONAL_CREDITOR',{});
          this.claim_form.claimModel = "OPERATIONAL";
          break;
       case 'Others':
          this.claimModelWindow="CLAIM_MODEL_OTHERS";
          this.modelService.open('CLAIM_MODEL_OTHERS',{});
          this.claim_form.claimModel = "OTHERS";
          break;
       case 'Employee & Workmen':
          if(!this.claim_form.creditors){
            this.notificationService.notify('bg-danger','Please fill creditor details.. ');
             // $.notify("Please fill creditor details.. ","error");
          }
          this.claimObj.unitDetails['name']=this.claim_form.creditors[0].name;
          this.claimModelWindow="CLAIM_MODEL_EMPLOYEE";
          this.modelService.open('CLAIM_MODEL_EMPLOYEE',{});
          this.claim_form.claimModel = "EMPLOYEE";
          break;
       case 'Employee & Workmen(Authorised Rep)':
          this.claimModelWindow="CLAIM_MODEL_EMPLOYEE";
          this.modelService.open('CLAIM_MODEL_EMPLOYEE',{});
          this.claim_form.claimModel = "EMPLOYEE";
          break;
     }
  }

  deleteDocument(doc:any,index:any,key?:any){

  }
  downloadFile(doc:any){

  }
  uploadFile(type:any,key?:any){

  }
  saveClaimForm(){

  }
  onlineClaimFormPopUp(type:any){

  }
  onlineBankAccount(){

  }
  onCompare( _right: KeyValue<any, any>,_left: KeyValue<any, any>): number {
    return 1;
  }
  calculateTotalClaimAmount(){
      var total:any=0;
      var amount:any=0;
      var interest:any=0;
      var penalty:any=0;
      var tax:any=0;
      this.claimDetails.forEach((claim:any) => {
        var unitTotal:any = 0;
        var unitAmount:any=0;
        var unitInterest:any=0;
        var unitPenalty :any=0;
        var unitTax:any =0;
        if(claim.paymentDetails && claim.paymentDetails.length>0){
          claim.paymentDetails.forEach((payment:any) => {
                    //$scope.calculateInterest(payment);
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
      this.claim_form.claimAmountDetails= this.claimDetails;
      this.claim_form.total = parseFloat(total).toFixed(2);
      this.claim_form.amount=parseFloat(amount).toFixed(2);
      this.claim_form.tax=parseFloat(tax).toFixed(2);
      this.claim_form.interest=parseFloat(interest).toFixed(2);
      this.claim_form.penalty=parseFloat(penalty).toFixed(2);
      //$scope.saveClaimForm();
  }
}
