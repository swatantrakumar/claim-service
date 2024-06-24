import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { DataShareService } from 'src/app/services/data-share-service/data-share.service';
import { ModelService } from 'src/app/services/model/model.service';
import { NotificationService } from 'src/app/services/notify/notification.service';
import { CommonFunctionService } from 'src/app/services/common-function/common-function.service';
import { SlicePipe } from '@angular/common';
import { StorageService } from 'src/app/services/storage-service/storage.service';

@Component({
  selector: 'app-claim-form-submit-model',
  templateUrl: './claim-form-submit-model.component.html',
  styleUrls: ['./claim-form-submit-model.component.css']
})
export class ClaimFormSubmitModelComponent implements OnInit {

  @Input() claim_form:any={};
  @Input() id: string ='';
  @Input() downloadFile!: (doc:any) => void;
  @Input() deleteDocument!:(doc:any,index:number,key?:any) => void;
  @Input() uploadFile!: (type:any,key?:any)  => void;
  @Input() setFiles!: (event:any, fileType:string,key?:any) => void;
  @Input() getSelectedFilenameForUpload!:() => void;
  @Input() saveClaimForm!: (doc:any) => void;
  @Input() in_progess_for_claimform_submit:boolean=false;
  @Output() submitModelResponce = new EventEmitter();

  @ViewChild('claimSubmiteModel') public claimSubmiteModel!: ModalDirective;

  deleteIndex:boolean=false;

  claimSubmit:boolean=false;
  pageTitle:string="";
  fieldName="";

  constructor(
    private modelService:ModelService,
    private notificationService:NotificationService,
    private dataShareService:DataShareService,
    private commonFunctionService:CommonFunctionService,
    private storageService:StorageService
  ) {
    this.dataShareService.confirmationResponce.subscribe(check =>{
      if(check && this.deleteIndex){
        this.deleteIndex = false;
          if(commonFunctionService.isHomeBuyer(this.claim_form) && this.storageService.isArMandatory()){
            if(!this.claim_form || !this.claim_form.authorised_person || this.claim_form.authorised_person.trim().length == 0){
              this.notificationService.notify('bg-danger',"Please Add Authorised Representative");
              return;
            }
          }        
        this.in_progess_for_claimform_submit = true;
        this.commonFunctionService.saveClaimForm(this.claim_form,'SUBMIT');
      }
    })
  }

  ngOnInit() {
    if (!this.id) {
        console.error('modal must have an id');
        return;
    }
    this.modelService.remove(this.id);
    this.modelService.add(this);
  }
  hint:string='';
  showModal(alert:any){
    this.claimSubmit = false;
    this.in_progess_for_claimform_submit=false;
    if(alert.type == "SUBMITE"){
      this.claimSubmit = true;
      this.pageTitle = "Claim Submit";
    }
    if(alert.title){
      this.pageTitle = alert.title;
    }
    if(alert.fieldName){
      this.fieldName = alert.fieldName;
    }
    if(alert.hint){
      this.hint = alert.hint;
    }
    this.claimSubmiteModel.show();
  }
  close(){
    this.claimSubmiteModel.hide();
    this.submitModelResponce.emit('');
    this.in_progess_for_claimform_submit=false;
    this.commonFunctionService.getClaimDataFormCaseId(this.storageService.GetActiveCaseId());
  }
  finalSubmissionAlert() {
    if(this.claim_form.catClass == "Home Buyers" && this.storageService.isArMandatory()){
      if(!this.claim_form || !this.claim_form.authorised_person || this.claim_form.authorised_person.trim().length == 0){
          this.notificationService.notify("bg-danger","\"Please Add Authorised Representative\"");
          return;
      }
    }
    this.deleteIndex = true;
    let message = "You can not make any further change after submission. Are you sure you want to Submit the Claim ?";
    let obj ={
      msg : message
    }
    this.modelService.open('confirmation_modal',obj);
  }
  checkFileUpload(){
    let check = true;
    if(this.claim_form && this.claim_form[this.fieldName] && this.claim_form[this.fieldName].length > 0){
      check = false;
    }
    return check;
  }

}
