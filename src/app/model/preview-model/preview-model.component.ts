import { Component, EventEmitter, Input, OnInit, Output, SecurityContext, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { DataShareService } from 'src/app/services/data-share-service/data-share.service';
import { ModelService } from 'src/app/services/model/model.service';
import { NotificationService } from 'src/app/services/notify/notification.service';
import { CommonFunctionService } from 'src/app/services/common-function/common-function.service';
import { DomSanitizer } from '@angular/platform-browser';

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
  @Output() previewModelResponce = new EventEmitter();
  @Input() showMyClaimForms!:()=>void;
  @ViewChild('previewModel') public previewModel!: ModalDirective;


  formB:any="<h4 >SCHEDULE </h4><h4>FORM B</h4><p >  PROOF OF CLAIM BY OPERATIONAL CREDITORS EXCEPT WORKMEN AND EMPLOYEES<br><i>(Under Regulation 7 of the Insolvency and Bankruptcy Board of India (Insolvency Resolution Process for Corporate Persons) Regulations, 2016)</i></p>";
  formC:any="<h4>FORM C </h4><h4>SUBMISSION OF CLAIM BY FINANCIAL CREDITOR</h4><p><i>(Under Regulation 8 of the Insolvency and Bankruptcy Board of India (Insolvency Resolution Process for Corporate Persons) Regulations, 2016)</i></p>";
  formCA:any="<h4 >FORM CA </h4><h4>SUBMISSION OF CLAIM BY FINANCIAL CREDITORS IN A CLASS</h4><p ><i>(Under Regulation 8A of the Insolvency and Bankruptcy (Insolvency Resolution Process for Corporate Persons) Regulations, 2016)</i></p>";
  formD:any="<h4>SCHEDULE </h4><h4>FORM D</h4><p><i>Proof Of Claim by a Workman or an Employee<br> (Under Regulation 9 of the Insolvency and Bankruptcy (Insolvency Resolution Process for Corporate Persons) Regulations, 2016)</i></p>";
  formF:any='<h4 class="text-center">SCHEDULE <br>FORM F</h4><p class="text-center">PROOF OF CLAIM BY CREDITORS (OTHER THAN FINANCIAL CREDITORS AND OPERATIONAL CREDITORS) <br> [Under Regulation 9A of the Insolvency and Bankruptcy Board of India (Insolvency Resolution Process for Corporate Persons) Regulations, 2016]</p>';
  headerContent:any="";
  formName:string='';
  previewData:any="";

  constructor(
    private modelService:ModelService,
    private notificationService:NotificationService,
    private dataShareService:DataShareService,
    private commonFunctionService:CommonFunctionService,
    private sanitizer: DomSanitizer
  ) {

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
    this.subscribePreviewHtml();
    this.previewModel.show();
  }
  data:any='';
  subscribePreviewHtml(){
    this.dataShareService.previewModelHtml.subscribe(data =>{
      if(data && data.success && data.success != ""){
        this.data = data.success;
        this.previewData = this.sanitizer.bypassSecurityTrustHtml(data.success);
      }
    })
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
    this.previewModelResponce.emit('');
    this.previewModel.hide();
  }

  // printData(value:any){
  //   var newWin:any = window.open("");
  //   newWin.document.write(this.data);
  //   newWin.print();
  //   newWin.close();
  // }

  printData(value: any) {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
  
    const setupPrint = () => {
      if (!iframe.contentWindow) {
        console.error('Unable to access iframe content window');
        alert('Printing failed due to browser restrictions.');
        document.body.removeChild(iframe);
        return;
      }
  
      iframe.contentWindow.document.open();
      iframe.contentWindow.document.write(`
        <html>
          <head>
            <title>Print</title>
            <style>
              body { font-family: Arial, sans-serif; }
              @media print {
                body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
              }
            </style>
          </head>
          <body>
            ${this.data}
          </body>
        </html>
      `);
      iframe.contentWindow.document.close();
  
      setTimeout(() => {
        try {
          if (iframe.contentWindow) {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
          } else {
            throw new Error('Cannot access iframe content window');
          }
        } catch (e) {
          console.error('Printing failed:', e);
          alert('Printing is not supported on this device or browser.');
        } finally {
          document.body.removeChild(iframe);
        }
      }, 1000);
    };
  
    if (iframe.contentWindow) {
      setupPrint();
    } else {
      iframe.onload = setupPrint;
    }
  }
  submitClaimForm(){
    let object = {
      type : "SUBMITE",
      fieldName : "signedForm",
      hint:"*Upload signed form for final submition of claim. You can upload the same from 'My Claim' dashboard."
    }
    this.modelService.open('SUBMITE_MODEL',object);
  };
  goToDashboard(){
    this.close();
    this.showMyClaimForms();
  }

}
