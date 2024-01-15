import { KeyValue } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonFunctionService } from 'src/app/services/common-function/common-function.service';
import { DataShareService } from 'src/app/services/data-share-service/data-share.service';
import { FileHandlerService } from 'src/app/services/file-handler/fileHandler.service';
import { ModelService } from 'src/app/services/model/model.service';
import { NotificationService } from 'src/app/services/notify/notification.service';
import { StorageService } from 'src/app/services/storage-service/storage.service';
import { MyClaimComponent } from '../../my-claim/my-claim.component';

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


  @Input() downloadFile!:(doc:any) => void;
  @Input() deleteDocument!:(doc:any,index:number,key?:any) => void;
  @Input() idVerificationWindow!: () => void;
  @Input() claimModelPopUp!: () => void;

  activecase:any;
  attachment_key:string="";
  fileType:string='';



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
    private fileHandlerService:FileHandlerService,
    private modelService:ModelService,
    private dataShareService:DataShareService,
    private notificationService:NotificationService,
    private apiService:ApiService
  ) {
    this.activecase = this.storageService.GetActiveCase();
    this.dataShareService.fileUploadResponce.subscribe(data =>{
      var notification = "";
      if(typeof data == "object"){
        Object.keys(data).forEach((key) => {
            let value = data[key];
            if(key !== 'data' && key!='uploadedFiles'){
                notification = notification + key + " : " + value + "; "
            }
            if(this.attachment_key && key==='uploadedFiles'){
                if(!this.claim_form.formAttachments[this.attachment_key]){
                    this.claim_form.formAttachments[this.attachment_key]=[]
                }
                for(var i=0; i<value.length;i++){
                    this.claim_form.formAttachments[this.attachment_key].push(value[i])
                }
                // $scope.claim_form.formAttachments[attachment_key] =value;
                this.commonFunctionService.saveClaimForm(this.claim_form);
            }
        })
      }
     // getAllFiles();
      this.notificationService.notify("bg-success",notification);
      this.fileTypes[this.fileType]=[];
      this.uploadData=[];
      this.attachment_key = "";
      if(data.data){
          //$scope.activeNode.children = data.data;
          this.claim_form.docList= data.data;
      }
      this.modelService.close("WAIT_MODEL");
    })


   }

  ngOnInit() {
  }

  getSelectedFilenameForUpload(){
    return this.fileHandlerService.getSelectedFilenameForUpload(this.uploadData);
  }
  getSelectedFilenameForUploadcustom(index:any){
    var fullId = 'inputGroupFile04_'+index;
    return this.fileHandlerService.getSelectedFilenameForUploadcustom(this.uploadData,fullId);
  }

  uploadData:any=[]
  fileTypes:any={}
  rxFiles:any = [];
  rxid:string='';
  rx:any = {};
  activeNode:any='';
  fileName:string='';
  // setFiles(event:any, fileType:string) {
  //   this.fileHandlerService.setFiles(event,fileType,this.claim_form,this.fileTypes,this.uploadData)
  // }
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
    this.fileTypes[fileType] = this.commonFunctionService.cloneObject(this.rxFiles);
  }

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








  uploadFile(type:any,key?:any){
    this.attachment_key = key;
    this.fileType = type;
    this.fileHandlerService.uploadFile(this.claim_form,this.uploadData);
  }
  saveClaimForm(){
    this.commonFunctionService.saveClaimForm(this.claim_form);
  }
  onlineClaimFormPopUp(type:any){
    this.modelService.open('securityDetailsModel',{})
  }
  onlineBankAccount(){
    this.modelService.open('addBankDetailsModel',{})
  }
  onCompare( _right: KeyValue<any, any>,_left: KeyValue<any, any>): number {
    return 1;
  }


}
