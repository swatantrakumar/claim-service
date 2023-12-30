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
    if(this.uploadData || this.uploadData && this.uploadData.length>0){
      var fullId = 'inputGroupFile04_'+index
      if(this.uploadData && this.uploadData.length > 0 && fullId == this.uploadData[0].id){
          if(!this.uploadData || this.uploadData.length==0){
              return " Choose File ";
          }else if(this.uploadData.length==1){
              return this.uploadData[0].fileName;
          }else {
              return this.uploadData.length + " Files" ;
          }

      }
      else{
          return " Choose File "
      }
    }
    else{
        return " Choose File "
    }
  }
  rxFiles:any = [];
  rxid:string='';
  uploadData:any=[]
  fileTypes:any={}
  activeNode:any='';
  fileName:string='';
  setFiles(event:any, fileType:string) {
      this.activeNode = this.claim_form.myPath;
      this.fileTypes[fileType] = [];
      this.uploadData=[];
      this.rxid = event.target.id;
      var files = event.target.files;
      this.fileName = files[0].name;
      for (var i = 0; i < files.length; i++) {
          var file = files[i];
          this.rxFiles.push(file);
          var reader = new FileReader();
          reader.onload = this.imageIsLoaded;
          reader.readAsDataURL(file);
      }
    //this.fileTypes[fileType] = CommonUtilService.cloneObject(this.rxFiles);
  }
  rx:any = {};
  imageIsLoaded= (e:any) => {
    var rxFile = this.rxFiles[0];
    this.rxFiles.splice(0, 1);
    this.rx = {};
    this.rx.fileData = e.target.result;
    this.rx.fileData = this.rx.fileData.split(',')[1];
    if (rxFile.name && rxFile.name != '') {
        this.rx.fileName = rxFile.name;
        this.rx.id = this.rxid;
        var splits = this.rx.fileName.split('.');
        this.rx.fileExtn = splits[splits.length-1];
        this.rx.innerBucketPath = this.activeNode.key+ "/"+this.rx.fileName;
    } else {
        this.rx.fileName = rxFile.webkitRelativePath;
    }
    this.rx.size = rxFile.size;
    this.uploadData.push(this.rx);

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
  onCompare( _right: KeyValue<any, any>,_left: KeyValue<any, any>): number {
    return 1;
  }
}
