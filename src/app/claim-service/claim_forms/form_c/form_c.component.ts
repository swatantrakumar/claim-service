import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form_c',
  templateUrl: './form_c.component.html',
  styleUrls: ['./form_c.component.css']
})
export class Form_cComponent implements OnInit {
  @Input() claim_form:any;
  @Input() claimObj:any;
  @Input() showIdDetails: boolean = false;
  @Input() showCinDetails: boolean = false;
  @Input() claimModeByClass: boolean = false;
  @Input() claimModeByBank: boolean = false;
  @Input() claimModeByEmployee:boolean =false;
  @Input() claimModeByOther:boolean =false;
  @Input() showDeclaration: boolean = false;
  @Input() showVerification: boolean = false;
  @Input() selectedForm:string='';
  @Input() activeTabName:string='';
  @Input() creditDetails:boolean=false;
  @Input() showForm:boolean=false;
  @Input() popUpWindow:any;

  @Input() downloadFile!:(doc:any)=>void;
  @Input() deleteDocument!:(doc:any,index:number,key?:any) => void;
  @Input() goNextPage!:()=>void;
  @Input() goPreviousPge!:()=>void;
  @Input() showMyClaimForms!:()=>void;
  @Input() previewFormWindow!:(obj:any)=>void;
  @Input() idVerificationWindow!: () => void;
  @Input() claimModelPopUp!: () => void;

  @Input() getSelectedFilenameForUpload!:() => void;
  @Input() uploadFile!:(type:any,key?:any) => void;
  @Input() getSelectedFilenameForUploadcustom!:(index:any) => void;
  @Input() setFiles!:(event:any, fileType:string) => void;
  @Input() saveClaimForm!:()=>void;
  @Input() onlineClaimFormPopUp!:(type:any) => void;
  @Input() onlineBankAccount!:() => void;

  formc:any='<h4 class="mt-3">FORM C </h4><h4>SUBMISSION OF CLAIM BY FINANCIAL CREDITOR</h4><p ><i>(Under Regulation 8 of the Insolvency and Bankruptcy Board of India (Insolvency Resolution Process for Corporate Persons) Regulations, 2016)</i></p>';
  formd:any='<h4 >SCHEDULE </h4><h4>FORM D</h4><p ><i>Proof Of Claim by a Workman or an Employee<br> (Under Regulation 9 of the Insolvency and Bankruptcy (Insolvency Resolution Process for Corporate Persons) Regulations, 2016)</i></p>';
  formb:any='<h4 >SCHEDULE </h4><h4>FORM B</h4><p >  PROOF OF CLAIM BY OPERATIONAL CREDITORS EXCEPT WORKMEN AND EMPLOYEES<br><i>(Under Regulation 7 of the Insolvency and Bankruptcy Board of India (Insolvency Resolution Process for Corporate Persons) Regulations, 2016)</i></p>';
  formca:any='<h4 class="mt-3">FORM CA </h4><h4>SUBMISSION OF CLAIM BY FINANCIAL CREDITORS IN A CLASS</h4><p ><i>(Under Regulation 8A of the Insolvency and Bankruptcy (Insolvency Resolution Process for Corporate Persons) Regulations, 2016)</i></p>';
  formf:any='<h4 class="text-center">SCHEDULE <br>FORM F</h4><p class="text-center">PROOF OF CLAIM BY CREDITORS (OTHER THAN FINANCIAL CREDITORS AND OPERATIONAL CREDITORS)<br> [Under Regulation 9A of the Insolvency and Bankruptcy Board of India (Insolvency Resolution Process for Corporate Persons) Regulations, 2016]</p>';
  headerContent='';
  constructor() { }

  ngOnInit() {
    if(this.popUpWindow == 'C'){
      this.headerContent = this.formc;
    }else if(this.popUpWindow == 'D'){
      this.headerContent = this.formd;
    }else if(this.popUpWindow == 'B'){
      this.headerContent = this.formb;
    }else if(this.popUpWindow == 'F'){
      this.headerContent = this.formf;
    }else if(this.popUpWindow == 'CA'){
      this.headerContent = this.formca;
    }
  }

}
