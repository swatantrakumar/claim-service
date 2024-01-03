import { KeyValue } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CommonFunctionService } from 'src/app/services/common-function/common-function.service';
import { FileHandlerService } from 'src/app/services/file-handler/fileHandler.service';
import { StorageService } from 'src/app/services/storage-service/storage.service';

@Component({
  selector: 'app-form_c_body',
  templateUrl: './form_c_body.component.html',
  styleUrls: ['./form_c_body.component.css']
})
export class Form_c_bodyComponent implements OnInit {
  @Input() claim_form:any
  @Input() claimObj:any;
  @Input() showIdDetails: boolean = false;
  @Input() showCinDetails:boolean = false;
  @Input() claimModeByClass:boolean=false;
  @Input() claimModeByBank:boolean=false;
  @Input() selectedForm:string='';
  @Input() activeTabName:string='';
  activecase:any;
  CIN_NO:boolean=false;
  fcIdentificationDetails:any=[];



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
    private storageService:StorageService,
    private commonFunctionService:CommonFunctionService,
    private fileHandlerService:FileHandlerService
  ) {
    this.activecase = this.storageService.GetActiveCase();
   }

  ngOnInit() {
  }

  getSelectedFilenameForUpload(){

  }
  getSelectedFilenameForUploadcustom(index:any){
    var fullId = 'inputGroupFile04_'+index;
    return this.fileHandlerService.getSelectedFilenameForUploadcustom(this.uploadData,fullId);
  }

  uploadData:any=[]
  fileTypes:any={}
  setFiles(event:any, fileType:string) {
    this.fileHandlerService.setFiles(event,fileType,this.claim_form,this.fileTypes,this.uploadData)
  }
  idVerificationWindow(){
    if (this.showCinDetails) {
      this.CIN_NO = true;
    }
    this.commonFunctionService.idVerificationWindow(this.claim_form,this.fcIdentificationDetails,this.CIN_NO);
  }
  claimDetails:any=[]
  payments:any=[]
  paymentsReview:any=[];
  claimModelWindow:string='';
  claimModelPopUp(){
    this.commonFunctionService.claimModelPopUp(this.claim_form,this.claimDetails,this.payments,this.activeTabName,this.claimModelWindow,this.claimObj);
    //$scope.payments_update_index = -1;
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
  onCompare( _right: KeyValue<any, any>,_left: KeyValue<any, any>): number {
    return 1;
  }

}
