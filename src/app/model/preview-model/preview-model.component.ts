import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { DataShareService } from 'src/app/services/data-share-service/data-share.service';
import { ModelService } from 'src/app/services/model/model.service';
import { NotificationService } from 'src/app/services/notify/notification.service';
import { CommonFunctionService } from 'src/app/services/common-function/common-function.service';

@Component({
  selector: 'app-preview-model',
  templateUrl: './preview-model.component.html',
  styleUrls: ['./preview-model.component.css']
})
export class PreviewModelComponent implements OnInit {

  @Input() claim_form:any;
  @Input() id: string ='';
  @Input() downloadFile!: (doc:any) => void;
  @Input() deleteDocument!:(doc:any,index:number,key?:any) => void;
  @Input() in_progess_for_claimform_submit:boolean=false;

  @ViewChild('previewModel') public previewModel!: ModalDirective;

  deleteIndex:boolean=false;

  constructor(
    private modelService:ModelService,
    private notificationService:NotificationService,
    private dataShareService:DataShareService,
    private commonFunctionService:CommonFunctionService
  ) {
    this.dataShareService.confirmationResponce.subscribe(check =>{
      if(this.deleteIndex){
        this.in_progess_for_claimform_submit = true;
        this.commonFunctionService.saveClaimForm(this.claim_form,'SUBMIT');
        this.close();
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
  showModal(){
    this.previewModel.show();
  }
  close(){
    this.previewModel.hide();
  }
  finalSubmissionAlert() {
    if(this.claim_form.catClass == "Home Buyers"){
        if(!this.claim_form || !this.claim_form.authorised_person){
            this.notificationService.notify("bg-danger","\"Please Add Authorised Representative\"");
        }
        if(!this.claim_form.formAttachments || !this.claim_form.formAttachments['application_form'] || this.claim_form.formAttachments['application_form'].length <= 0){
            this.notificationService.notify("bg-danger","\"Please take a print of this form before submitting, sign it and scan. Upload the same in point a of Supporting documents\"");
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
  printData(value:any){
    var divToPrint:any = document.getElementById(value);
    var newWin:any = window.open("");
    newWin.document.write(divToPrint.outerHTML);
    newWin.print();
    newWin.close();
  }

}
