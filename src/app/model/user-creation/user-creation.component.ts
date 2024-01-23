import { NotificationService } from 'src/app/services/notify/notification.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { ModelService } from 'src/app/services/model/model.service';
import { StorageService } from 'src/app/services/storage-service/storage.service';
import { ApiService } from 'src/app/services/api-service/api.service';
import { DataShareService } from 'src/app/services/data-share-service/data-share.service';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent implements OnInit {
  myShortName = 'UMT';
  update:boolean = false;
  permCategory:string='';
  user:any={};
  refCode='';

  @Input() id: string ='';
  @ViewChild('userCreationModel') public userCreationModel!: ModalDirective;
  @Input() closeModel!:() => void;

  constructor(
    private modelService:ModelService,
    private storageService:StorageService,
    private notificationService:NotificationService,
    private apiService:ApiService,
    private dataShareService:DataShareService
  ) {
    this.dataShareService.userAddResponce.subscribe(data =>{
      if (data) {
        switch (data.message) {
          case 'success':
              this.user = {}
              this.close();
              //this.searchParty();
              var msg = 'Registration request submitted successfully !!!';
              if(this.update){
                msg = 'Update request submitted successfully !!!';
              }
              this.notificationService.notify("bg-success",msg);
              break;
          case 'error':
              var msg = 'Registration failed, Please try after sometime..';
              if(this.update){
                msg = 'Update failed, Please try after sometime..';
              }
              this.notificationService.notify("bg-danger",msg);
              break;
          case 'duplicate':
              var msg = 'User already exist !!!, Please try with another userId';
              if(this.update){
                msg = 'User already exist !!!, Please try with another userId';
              }
              this.notificationService.notify("bg-danger",msg);
              break;
        }
        this.modelService.close('WAIT_MODEL');
      }
    });
   }

    ngOnInit() {
      if (!this.id) {
          console.error('modal must have an id');
          return;
      }
      this.modelService.remove(this.id);
      this.modelService.add(this);
    }
    showModal(alert:any){
      this.permCategory = this.storageService.getUserPermissionCategory();
      if(alert.update){
        this.update = alert.update;
        let data = alert.data;
        this.user = data;
      }
      this.userCreationModel.show();
    }
    close(){
      this.userCreationModel.hide();
      this.closeModel();
    }
    removePopup(){
      this.close();
    }
    getId(id:string){
      if(id){
          return ( "#" + this.myShortName + id)
      }else{
        return '';
      }
    }
    focusOnId(id:string) {
      if(id != ''){
        //userManagementScope.currentFocusedItem = id;
        setTimeout(function () {
          let elementRef = document.getElementById(id);
          elementRef?.focus();
        }, 50);
      }
    }
    searchParty() {
      //this.focusOnId("#UMTpartysearch");
      // $scope.openCompanyListPOPup = false;
      // $scope.focusOnId(this.currentFocusedItem);
      // $scope.searchCustomer(this.search.name);
    }
    saveNewUser() {
      if(this.user && typeof this.user == 'object' && Object.keys(this.user).length > 0){
        let payload = {
          path : 'register',
          data : {}
        }
        if(this.update){
          payload.path = 'uptuser';
        }
        if (!this.user.userId || this.user.userId.length < 4) {
            this.notificationService.notify("bg-danger","Please enter a valid UserId/EmailId ");
            this.focusOnId(this.getId('nuserid'));

            return;
        }
        if (!this.user.first_name || this.user.first_name.length < 2) {
            this.notificationService.notify("bg-danger","Please enter a valid First Name ");
            this.focusOnId(this.getId('nfirstname'));

            return;
        }
        if (!this.user.email || this.user.email.length < 5) {
            this.notificationService.notify("bg-danger","Please enter a valid email  ");
            this.focusOnId(this.getId('email'));
          return;
        }
        if(!this.user.permissions) this.user.permissions=["TASKS"];
        if(!this.user.refCode) this.user.refCode=this.refCode;
        payload.data = this.user;
        this.apiService.saveUser(payload);
        this.modelService.open('WAIT_MODEL',{});
      }
    }

}
