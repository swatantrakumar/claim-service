import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModelService } from 'src/app/services/model/model.service';
import { ModalDirective } from 'angular-bootstrap-md';
import { CommonFunctionService } from 'src/app/services/common-function/common-function.service';
import { NotificationService } from 'src/app/services/notify/notification.service';
import { DataShareService } from 'src/app/services/data-share-service/data-share.service';
import { StorageService } from 'src/app/services/storage-service/storage.service';
import { ApiService } from 'src/app/services/api-service/api.service';

@Component({
  selector: 'app-add-bank-details',
  templateUrl: './add-bank-details.component.html',
  styleUrls: ['./add-bank-details.component.css']
})
export class AddBankDetailsComponent implements OnInit {

  @Input() claim_form:any;
  @Input() id: string ='';
  @ViewChild('bankDetailsModel') public bankDetailsModel!: ModalDirective;

  CreditorDetails:any;
  accountDetails:any={};
  myShortName = 'mc';
  activeIndex:number=-1;

  constructor(
    private modelService:ModelService,
    private commonFunctionService:CommonFunctionService,
    private notificationService:NotificationService,
    private dataShareService:DataShareService,
    private storageService:StorageService,
    private apiService:ApiService
  ) {
    this.dataShareService.confirmationResponce.subscribe(check =>{
      if(this.activeIndex > -1){
        this.deleteCreaditor(check);
      }
    })
   }

  ngOnInit() {
    let modal = this;
    if (!this.id) {
        console.error('modal must have an id');
        return;
    }
    this.modelService.remove(this.id);
    this.modelService.add(this);
  }

  closeBankAccount(){
    this.bankDetailsModel.hide();
    this.accountDetails={};

  }

  showModal(){
    this.bankDetailsModel.show();
    if(this.claim_form && this.claim_form.bankAccount){
      this.accountDetails = (this.commonFunctionService.cloneObject(this.claim_form.bankAccount));
    }else{
      this.accountDetails={};
    }
  }

  deleteCreditorDetails(i:number){
    if(this.CreditorDetails && this.CreditorDetails[i]){
      this.activeIndex = i;
      let message = "Are you sure you want to delete "+ this.CreditorDetails[i].name + " ?";
      let obj ={
        msg : message
      }
      this.modelService.open('confirmation_modal',obj)
    }
  }
  isValidName(field_name:any,label:any){
    if(!this.commonFunctionService.isValidName(this.accountDetails[field_name])){
      this.notificationService.notify('bg-danger',"Please enter valid " +label);
      return false;
    }
    return true;
  }
  isValidAlphaNumeric(field_name:any,label:any){
    if(!this.commonFunctionService.isValidAlphaNumeric(this.accountDetails[field_name])){
      this.notificationService.notify('bg-danger',"Please enter valid " +label);
      return false;
    }
    return true;
  }

  isValidNumber(field_name:any,label:any){
    if(!this.commonFunctionService.validateNumber(this.accountDetails[field_name],'positivedec')){
      this.notificationService.notify('bg-danger',"Please enter valid " +label);
      return false;
    }
    return true;
  }
  deleteCreaditor(check:boolean){
    if(check){
      this.CreditorDetails.splice(this.activeIndex,1);
      this.activeIndex = -1;
    }
  }
  saveBankDetails(){
    if (!this.accountDetails.bankName || !this.isValidName("bankName","Bank Name")) {
      this.notificationService.notify('bg-danger',"Please enter a valid Bank Name");
        return;
    }
    if (!this.accountDetails.branch) {
        this.notificationService.notify('bg-danger',"Please enter a valid Branch Name");
            return;
    }
    if (!this.accountDetails.accountNumber || !this.isValidNumber('accountNumber',"Account Number")) {
        this.notificationService.notify('bg-danger',"Please enter a valid Account Number");
            return;
    }
    if (!this.accountDetails.ifscCode) {
        this.notificationService.notify('bg-danger',"Please enter a valid IFSC Number");
            return;
    }
    //this.finCreditor.bankAccountDetail =[];
    this.claim_form.bankAccount = (this.commonFunctionService.cloneObject(this.accountDetails));
    this.commonFunctionService.saveClaimForm(this.claim_form);
    //this.bankDetailsGrid=true;
    this.closeBankAccount();
  }
}
