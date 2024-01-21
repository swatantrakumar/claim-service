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
  formB:any="<h4 >SCHEDULE </h4><h4>FORM B</h4><p >  PROOF OF CLAIM BY OPERATIONAL CREDITORS EXCEPT WORKMEN AND EMPLOYEES<br><i>(Under Regulation 7 of the Insolvency and Bankruptcy Board of India (Insolvency Resolution Process for Corporate Persons) Regulations, 2016)</i></p>";
  formC:any="<h4>FORM C </h4><h4>SUBMISSION OF CLAIM BY FINANCIAL CREDITOR</h4><p><i>(Under Regulation 8 of the Insolvency and Bankruptcy Board of India (Insolvency Resolution Process for Corporate Persons) Regulations, 2016)</i></p>";
  formCA:any="<h4 >FORM CA </h4><h4>SUBMISSION OF CLAIM BY FINANCIAL CREDITORS IN A CLASS</h4><p ><i>(Under Regulation 8A of the Insolvency and Bankruptcy (Insolvency Resolution Process for Corporate Persons) Regulations, 2016)</i></p>";
  formD:any="<h4>SCHEDULE </h4><h4>FORM D</h4><p><i>Proof Of Claim by a Workman or an Employee<br> (Under Regulation 9 of the Insolvency and Bankruptcy (Insolvency Resolution Process for Corporate Persons) Regulations, 2016)</i></p>";
  formF:any='<h4 class="text-center">SCHEDULE <br>FORM F</h4><p class="text-center">PROOF OF CLAIM BY CREDITORS (OTHER THAN FINANCIAL CREDITORS AND OPERATIONAL CREDITORS) <br> [Under Regulation 9A of the Insolvency and Bankruptcy Board of India (Insolvency Resolution Process for Corporate Persons) Regulations, 2016]</p>';
  headerContent:any="";
  formName:string='';

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
  showModal(alert:any){
    this.formName = alert.formName;
    this.setPreviewHeaderContent();
    this.previewModel.show();
  }
  setPreviewHeaderContent(){
    if(this.formName == 'C'){
      this.headerContent = this.formC;
    }else if(this.formName == 'D'){
      this.headerContent = this.formD;
    }else if(this.formName == 'B'){
      this.headerContent = this.formB;
    }else if(this.formName == 'F'){
      this.headerContent = this.formF;
    }else if(this.formName == 'CA'){
      this.headerContent = this.formCA;
    }
  }
  close(){
    this.previewModel.hide();
  }
  finalSubmissionAlert() {
    if(this.claim_form.catClass == "Home Buyers"){
        if(!this.claim_form || !this.claim_form.authorised_person){
            this.notificationService.notify("bg-danger","\"Please Add Authorised Representative\"");
        }
        // if(!this.claim_form.formAttachments || !this.claim_form.formAttachments['application_form'] || this.claim_form.formAttachments['application_form'].length <= 0){
        //     this.notificationService.notify("bg-danger","\"Please take a print of this form before submitting, sign it and scan. Upload the same in point a of Supporting documents\"");
        //     return;
        // }
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
