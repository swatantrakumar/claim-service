import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { DataShareService } from 'src/app/services/data-share-service/data-share.service';
import { ModelService } from 'src/app/services/model/model.service';
import { NotificationService } from 'src/app/services/notify/notification.service';
import { CommonFunctionService } from 'src/app/services/common-function/common-function.service';

@Component({
  selector: 'app-claim-form-submit-model',
  templateUrl: './claim-form-submit-model.component.html',
  styleUrls: ['./claim-form-submit-model.component.css']
})
export class ClaimFormSubmitModelComponent implements OnInit {

  @Input() claim_form:any;
  @Input() id: string ='';
  @Input() downloadFile!: (doc:any) => void;
  @Input() deleteDocument!:(doc:any,index:number,key?:any) => void;
  @Input() uploadFile!: (type:any,key?:any)  => void;
  @Input() setFiles!: (event:any, fileType:string) => void;
  @Input() getSelectedFilenameForUpload!:() => void;
  @Input() saveClaimForm!: (doc:any) => void;
  @Input() in_progess_for_claimform_submit:boolean=false;

  @ViewChild('claimSubmiteModel') public claimSubmiteModel!: ModalDirective;

  deleteIndex:boolean=false;

  claimSubmit:boolean=false;
  pageTitle:string="";

  constructor(
    private modelService:ModelService,
    private notificationService:NotificationService,
    private dataShareService:DataShareService,
    private commonFunctionService:CommonFunctionService
  ) {
    this.dataShareService.confirmationResponce.subscribe(check =>{
      if(check && this.deleteIndex){
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
  showModal(alert:any){
    this.claimSubmit = false;
    if(alert.type == "SUBMITE"){
      this.claimSubmit = true;
      this.pageTitle = "Claim Submit";
    }
    this.claimSubmiteModel.show();
  }
  close(){
    this.claimSubmiteModel.hide();
  }
  finalSubmissionAlert() {
    if(this.claim_form.catClass == "Home Buyers"){
      if(!this.claim_form || !this.claim_form.authorised_person){
          this.notificationService.notify("bg-danger","\"Please Add Authorised Representative\"");
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
    // if(this.claim_form){
    //   check = false;
    // }
    return check;
  }

}
