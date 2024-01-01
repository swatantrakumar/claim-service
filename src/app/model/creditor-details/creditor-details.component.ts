import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModelService } from 'src/app/services/model/model.service';
import { ModalDirective } from 'angular-bootstrap-md';
import { CommonFunctionService } from 'src/app/services/common-function/common-function.service';
import { NotificationService } from 'src/app/services/notify/notification.service';
import { DataShareService } from 'src/app/services/data-share-service/data-share.service';
import { StorageService } from 'src/app/services/storage-service/storage.service';
import { ApiService } from 'src/app/services/api-service/api.service';

@Component({
  selector: 'app-creditor-details',
  templateUrl: './creditor-details.component.html',
  styleUrls: ['./creditor-details.component.css']
})
export class CreditorDetailsComponent implements OnInit {
  @Input() claim_form:any;
  @Input() id: string ='';
  @Input() selectedForm:string='';
  @Output() creditorDetails = new EventEmitter();
  @ViewChild('creditorModel') public creditorModel!: ModalDirective;

  CreditorDetails:any;
  finCreditor:any={};
  myShortName = 'mc';
  activeIndex:number=-1;
  isEmailExisted:boolean=false;
  creditDetails:boolean=false;

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
    this.dataShareService.emailExists.subscribe(check =>{
      if(check.status){
        this.isEmailExisted = check.status;
      }
      if(check.msg && check.msg != ''){
        this.notificationService.notify('bg-danger',check.msg);
      }
      this.isEmailExisted = check.status;
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

  closeModal(){
    this.creditorModel.hide();
  }

  showModal(){
    this.creditorModel.show();
  }
  addCreditorDetails(){
    if(this.selectedForm!=='Home Buyers' &&  this.selectedForm!=='Home Buyers(Authorised Rep)' && this.selectedForm!=='Commercial Buyer' && this.selectedForm!=='Commercial Buyer(Authorised Rep)'){
      this.finCreditor.ownership=100;
    }

    var mandatoryFields = ['name','email','phone','pinCode','ownership'];
    for(var i=0; i<mandatoryFields.length;i++){
      if(!this.finCreditor || !this.finCreditor[mandatoryFields[i]]){
          this.notificationService.notify('bg-danger',"Please fill all mandatory fields");
          //$.notify("Please fill all mandatory fields", "error");
          //$scope.focusOnId("#" + this.myShortName +"finc_"+mandatoryFields[i]);
          return;
      }
    }
    if(!this.commonFunctionService.isValidEmail(this.finCreditor.email)){
        this.notificationService.notify('bg-danger',"Please enter valid email..");
        //$.notify("Please enter valid email..", "error");
        //$scope.focusOnId("#" + this.myShortName +"finc_email");
        return;
    }
    if(!this.commonFunctionService.isValidZipCode(this.finCreditor.pinCode)){
        this.notificationService.notify('bg-danger',"Please enter valid Zip Code..");
        //$.notify("Please enter valid Zip Code..", "error");
        //$scope.focusOnId("#" + this.myShortName +"finc_pinCode");
        return;
    }

    if(!this.CreditorDetails) this.CreditorDetails = [];
    let totalOwnerShip:any=parseFloat(this.finCreditor.ownership);
    this.CreditorDetails.forEach((cred:any) => {
      totalOwnerShip = parseFloat(totalOwnerShip) + parseFloat(cred.ownership);
    });

    if(totalOwnerShip>100){
      this.notificationService.notify('bg-danger',"Total ownership can not be more than 100 %");
      //$.notify("Total ownership can not be more than 100 %", "error");
      //$scope.focusOnId("#" + this.myShortName +"finc_ownership");
      return
    }
    let newCredDetails:any = {};
    newCredDetails.name = this.finCreditor.name
    newCredDetails.email = this.finCreditor.email
    newCredDetails.phone = this.finCreditor.phone
    newCredDetails.address={};
    newCredDetails.address.address = this.finCreditor.address
    newCredDetails.address.city = this.finCreditor.city
    newCredDetails.address.state = this.finCreditor.state
    newCredDetails.address.country = this.finCreditor.country
    newCredDetails.address.pinCode = this.finCreditor.pinCode
    newCredDetails.ownership =  this.finCreditor.ownership
    this.CreditorDetails.push(this.commonFunctionService.cloneObject(newCredDetails));
    this.finCreditor={};
  }
  editDetails(type:string,i:number){
    if(type){
      switch(type.toLowerCase()){
         case 'creditor':
          var creditor= this.CreditorDetails[i]
          this.finCreditor.name =  creditor.name;
          this.finCreditor.email = creditor.email
          this.finCreditor.phone = creditor.phone
          this.finCreditor.address = creditor.address.address
          this.finCreditor.city = creditor.address.city
          this.finCreditor.state = creditor.address.state
          this.finCreditor.country = creditor.address.country
          this.finCreditor.pinCode = creditor.address.pinCode
          this.finCreditor.ownership = creditor.ownership
          this.CreditorDetails.splice(i,1);
          break;
      }

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
  deleteCreaditor(check:boolean){
    if(check){
      this.CreditorDetails.splice(this.activeIndex,1);
      this.activeIndex = -1;
    }
  }
  saveCreditorDetails(){
    if(this.isEmailExisted){
      this.notificationService.notify('bg-danger',"Email is already used please use another");
      return;
    }
    var value=null;
    for(var i=0;i<this.CreditorDetails.length;i++){
          var list=this.CreditorDetails[i];
          if(value==null || list.ownership > value.ownership){
              value=list;
          }
    }
    if(value==null){
      value = this.CreditorDetails[0];
    }
    //$scope.primaryClaimant=value;
    this.claim_form['creditors'] = this.CreditorDetails;
    this.claim_form['primaryClaimant'] = value;
    this.saveClaimForm();
    this.creditDetails=true;
    this.creditorDetails.emit(this.creditDetails);
    this.closeModal();
  }
  isEmailExistedInDb(email:string){
    this.commonFunctionService.checkEmailExistedOrNot(email);
  }
  saveClaimForm(submit?:any){
    if(this.commonFunctionService.removeSpecialCharacters(this.claim_form.formType) ===""){
      this.claim_form.formType = "USER_CLAIM";
    }
      var x = this.claim_form.primaryClaimant;
      this.claim_form['userId'] = this.storageService.getUserId();
      if(this.claim_form.claimAmountDetails){
        for(var i=0;i<this.claim_form.claimAmountDetails.length;i++){
                this.claim_form.claimAmountDetails[i].type=this.claim_form.claimAmountDetails[i].unitDetails.type;
                this.claim_form.claimAmountDetails[i].unit=this.claim_form.claimAmountDetails[i].unitDetails.unit;
                this.claim_form.claimAmountDetails[i].comment=this.claim_form.claimAmountDetails[i].unitDetails.comment;
                this.claim_form.claimAmountDetails[i].otherType=this.claim_form.claimAmountDetails[i].unitDetails.otherType;

        }
      }
      if(this.claim_form.category=='EC'){
      this.claim_form.claimModel='EMPLOYEE'
      }
      if(submit && submit==='SUBMIT'){
        if(this.claim_form.catClass == 'HOME_BUYER'){
            if(!this.claim_form || !this.claim_form.authorised_person){
              this.notificationService.notify('bg-danger',"Please Add Authorised Representative");
                //$.notify("\"Please Add Authorised Representative\"", "error")
            }
            if(!this.claim_form.formAttachments || !this.claim_form.formAttachments['application_form'] || this.claim_form.formAttachments['application_form'].length <= 0){
                //$.notify("\"Please take a print of this form before submitting, sign it and scan. Upload the same in point a of Supporting documents\"", "error")
                this.notificationService.notify('bg-danger',"Please take a print of this form before submitting, sign it and scan. Upload the same in point a of Supporting documents");
                return;
            }
        }

          this.claim_form.formStatus = "SUBMITTED";
          if(!this.claim_form.claimDate) this.claim_form.claimDate = new Date();
      }else if(this.claim_form.formStatus === "SUBMITTED"){
      //DO NOT CHANGE STATUS
      }else{
          this.claim_form.formStatus = "SAVED";
      }
      this.commonFunctionService.setClientLog(this.claim_form);
      this.commonFunctionService.setBaseEntity(this.claim_form);
      let payload = {
        path : "claimform",
        data : this.claim_form,
        type : submit
      }
      this.apiService.saveNewClaim(payload);

      // CommonUtilService.saveSingleCaseAttribute("claimform",this.claim_form)
      //   .success(function(data,status){
      //   this.in_progess_for_claimform_submit = false;
      //       this.claim_form = data.success;
      //       if(submit && submit==='SUBMIT'){
      //           this.showMyClaimForms()
      //           $.notify("Claim Form Submitted Successfully!!!", "success");
      //       }
      //       safeApply($scope);
      //   })
      //   .error(function(data,status){
      //   $scope.in_progess_for_claimform_submit = false;
      //   $.notify("Error occured while saving..", "error");
      // })

  }
}
