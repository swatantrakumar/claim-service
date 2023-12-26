import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage-service/storage.service';

@Component({
  selector: 'app-form_c_body',
  templateUrl: './form_c_body.component.html',
  styleUrls: ['./form_c_body.component.css']
})
export class Form_c_bodyComponent implements OnInit {
  @Input() claim_form:any
  @Input()
  showIdDetails!: boolean;
  @Input() showCinDetails!:boolean;
  @Input() claimModeByClass:any;
  @Input() claimModeByBank:any;
  @Input() selectedForm:any;
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

  getSelectedFilenameForUpload(){

  }
  getSelectedFilenameForUploadcustom(index:any){

  }
  idVerificationWindow(){

  }
  claimModelPopUp(){

  }

  deleteDocument(doc:any,index:any,key?:any){

  }
  downloadFile(doc:any){

  }
  uploadFile(type:any,key?:any){

  }
  saveClaimForm(){

  }
  onlineClaimFormPopUp(type:any){

  }
  onlineBankAccount(){

  }
}
