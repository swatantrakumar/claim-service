import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonFunctionService } from 'src/app/services/common-function/common-function.service';
import { DataShareService } from 'src/app/services/data-share-service/data-share.service';
import { ModelService } from 'src/app/services/model/model.service';
import { NotificationService } from 'src/app/services/notify/notification.service';
import { StorageService } from 'src/app/services/storage-service/storage.service';

@Component({
  selector: 'app-id-details',
  templateUrl: './id-details.component.html',
  styleUrls: ['./id-details.component.css']
})
export class IdDetailsComponent implements OnInit {

  @Input() claim_form:any;
  @Input() id: string ='';
  @Input() CIN_NO:boolean=false;
  @Input() fcIdentificationDetails:any=[];
  @ViewChild('idDetailsModel') public idDetailsModel!: ModalDirective;

  finCreditor:any={};

  deleteIndex=-1;

  constructor(
    private modelService:ModelService,
    private commonFunctionService:CommonFunctionService,
    private notificationService:NotificationService,
    private dataShareService:DataShareService,
    private storageService:StorageService,
    private apiService:ApiService
  ) {
    this.dataShareService.confirmationResponce.subscribe(check =>{
      if(this.deleteIndex > -1){
        this.deleteIdDetails(check);
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

  deleteIdRecords(object:any,index:number){
    if(object && object[index]){
      this.deleteIndex = index;
      let message = "Are you sure you want to delete "+ object[index].nameOnId +" (" + object[index].idType + ":" + object[index].idNumber + ") ? ";
      let obj ={
        msg : message
      }
      this.modelService.open('confirmation_modal',obj)
    }
  }
  closeIdVerification(){
    this.idDetailsModel.hide();
  }
  showModal(){
    this.finCreditor = {};
    this.idDetailsModel.show();
  }
  identificationDetails(){
    if (!this.finCreditor.idType) {
      this.notificationService.notify('bg-danger',"Please enter a valid ID Type");
      return;
      }
     if (!this.finCreditor.name) {
          this.notificationService.notify('bg-danger',"Please enter a valid ID Name");

          return;
     }
     if (!this.finCreditor.nameOnId) {
          this.notificationService.notify('bg-danger',"Please enter a valid ID Name");

          return;
     }
     if (!this.finCreditor.idNumber || !this.isValidAlphaNumeric('idNumber', "ID Number")) {
          this.notificationService.notify('bg-danger',"Please enter a valid ID Number");
          return;
     }
     if(this.claim_form.ids && this.claim_form.ids.length>0){
         for(var i=0; i< this.claim_form.ids.length;i++){
             if(this.claim_form.ids[i].idNumber===this.finCreditor.idNumber){
                this.notificationService.notify('bg-danger',"Duplicate Id error");
                return;
             }
         }
     }
    this.fcIdentificationDetails.push(this.commonFunctionService.cloneObject(this.finCreditor));
    this.finCreditor.idNumber='';
    this.finCreditor.idType='';
    this.finCreditor.nameOnId='';
    this.finCreditor.name='';
    this.finCreditor.cinNumber='';
    this.claim_form.ids=this.commonFunctionService.cloneObject (this.fcIdentificationDetails);
    this.commonFunctionService.saveClaimForm(this.claim_form);
  }
  isValidAlphaNumeric(field_name:any,label:any){
    if(!this.commonFunctionService.isValidAlphaNumeric(this.finCreditor[field_name])){
      this.notificationService.notify('bg-danger',"Please enter valid " +label);
      return false;
    }
    return true;
  }
  isValidName(field_name:any,label:any){
    if(!this.commonFunctionService.isValidName(this.finCreditor[field_name])){
      this.notificationService.notify('bg-danger',"Please enter valid " +label);
      return false;
    }
    return true;
  }
  deleteIdDetails(check:boolean){
    if(check){
      this.fcIdentificationDetails.splice(this.deleteIndex,1);
      this.deleteIndex = -1;
    }
  }

}
