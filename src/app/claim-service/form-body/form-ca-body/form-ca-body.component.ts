import { KeyValue } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage-service/storage.service';

@Component({
  selector: 'app-form-ca-body',
  templateUrl: './form-ca-body.component.html',
  styleUrls: ['./form-ca-body.component.css']
})
export class FormCaBodyComponent implements OnInit {
  @Input() claim_form:any
  @Input() showIdDetails: boolean = false;
  @Input() showCinDetails:boolean = false;
  @Input() claimModeByClass:boolean=false;
  @Input() claimModeByBank:boolean=false;
  @Input() selectedForm:string='';


  @Input() downloadFile!:(doc:any) => void;
  @Input() deleteDocument!:(doc:any,index:number,key?:any) => void;
  @Input() idVerificationWindow!: () => void;
  @Input() claimModelPopUp!: () => void;
  @Input() getSelectedFilenameForUpload!:() => void;
  @Input() uploadFile!:(type:any,key?:any) => void;
  @Input() getSelectedFilenameForUploadcustom!:(index:any) => void;
  @Input() setFiles!:(event:any, fileType:string,key?:any) => void;
  @Input() saveClaimForm!:()=>void;
  @Input() onlineClaimFormPopUp!:(type:any) => void;
  @Input() onlineBankAccount!:() => void;

  activecase:any;




  list_of_files_to_attach_for_home_buyer = {
    application_form:'Claim Form',
    identification_documents:'Identification Documents',
    allotment_letter:'Allotment Letter Upload',
    builder_buyer_agreement:'Builder Buyer Agreement',
    payment_receipt:'Payment Receipt',
    calculation_of_claim_amount:'Calculation of Claim Amount',
    tripartite_agreement:'Tripartite Agreement(incase of Home Loan)',
    credit_Notes_other_adjustments:'Credit Notes/other adjustments',
    court_order:'Court Order(if any)',
    other:'Other'
  }
  alphabates = 'abcdefghijklmnopqrstuvwxyz';
  constructor(
    private storageService:StorageService
  ) {
    this.activecase = this.storageService.GetActiveCase();

   }

  ngOnInit() {
  }
  onCompare( _right: KeyValue<any, any>,_left: KeyValue<any, any>): number {
    return 1;
  }

}
