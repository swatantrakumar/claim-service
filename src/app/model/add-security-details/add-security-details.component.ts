import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModelService } from 'src/app/services/model/model.service';
import { ModalDirective } from 'angular-bootstrap-md';
import { CommonFunctionService } from 'src/app/services/common-function/common-function.service';
import { NotificationService } from 'src/app/services/notify/notification.service';
import { DataShareService } from 'src/app/services/data-share-service/data-share.service';
import { StorageService } from 'src/app/services/storage-service/storage.service';
import { ApiService } from 'src/app/services/api-service/api.service';


@Component({
  selector: 'app-add-security-details',
  templateUrl: './add-security-details.component.html',
  styleUrls: ['./add-security-details.component.css']
})
export class AddSecurityDetailsComponent implements OnInit {

  @Input() claim_form:any;
  @Input() id: string ='';
  @Input() selectedForm:string='';
  @Output() creditorDetails = new EventEmitter();
  @ViewChild('securityDetailsModel') public securityDetailsModel!: ModalDirective;
  activeIndex:number=-1;
  security:any={};
  secDetails:any=[];

  constructor(
    private modelService:ModelService,
    private commonFunctionService:CommonFunctionService,
    private notificationService:NotificationService,
    private dataShareService:DataShareService,
    private storageService:StorageService,
    private apiService:ApiService
  ) {
    this.dataShareService.confirmationResponce.subscribe(check =>{
      if(this.activeIndex > -1){
        this.deleteSecurity(check);
      }
    })
    if(this.claim_form && this.claim_form.secDetails){
      this.secDetails=this.commonFunctionService.cloneObject(this.claim_form.secDetails);
    }
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

  closeModal(){
    this.claim_form.secDetails=this.commonFunctionService.cloneObject(this.secDetails);
    this.commonFunctionService.saveClaimForm(this.claim_form);
    this.security={};
    this.securityDetailsModel.hide();
    this.secDetails=[];
  }

  showModal(){
    if(this.claim_form && this.claim_form.secDetails){
      this.secDetails=this.commonFunctionService.cloneObject(this.claim_form.secDetails);
    }else{
      this.secDetails=[];
    }
    this.securityDetailsModel.show();
  }
  deleteSecurityDetails(i:number){
    if(this.secDetails && this.secDetails[i]){
      this.activeIndex = i;
      let message = "Are you sure you want to delete "+ this.secDetails[i].name + " ?";
      let obj ={
        msg : message
      }
      this.modelService.open('confirmation_modal',obj)
    }
  }
  deleteSecurity(check:boolean){
    if(check){
      this.secDetails.splice(this.activeIndex,1);
      this.activeIndex = -1;
    }
  }
  saveSecurity(){
    if (!this.security.date) {
      this.notificationService.notify('bg-danger',"Please enter a valid Date");
      return;
    }
    if (!this.security.name) {
      this.notificationService.notify('bg-danger',"Please enter a valid Security");
      return;
    }
    if (!this.security.value) {
      this.notificationService.notify('bg-danger',"Please enter a valid Value");
      return;
    }
   this.secDetails.push(this.security);
   this.claim_form.secDetails=this.commonFunctionService.cloneObject(this.secDetails);
   this.commonFunctionService.saveClaimForm(this.claim_form);
   this.security={};
  }

}
