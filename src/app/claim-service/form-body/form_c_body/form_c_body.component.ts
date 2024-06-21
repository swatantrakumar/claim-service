import { KeyValue } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage-service/storage.service';

@Component({
  selector: 'app-form_c_body',
  templateUrl: './form_c_body.component.html',
  styleUrls: ['./form_c_body.component.css']
})
export class Form_c_bodyComponent implements OnInit {
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
