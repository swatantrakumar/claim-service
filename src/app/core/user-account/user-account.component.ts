import { AuthDataShareService } from './../../services/data-share-service/auth-data-share/auth-data-share.service';
import { Component, OnInit } from '@angular/core';
import { StorageService } from './../../services/storage-service/storage.service';
import { AwsCognitoService } from 'src/app/services/aws-cognito/aws-cognito.service';
import { ApiService } from 'src/app/services/api-service/api.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  userName:string='';
  user:string='';
  userEmail:string='';
  userInfo:any;



  constructor(
    private storageService:StorageService,
    private awsCognitoService:AwsCognitoService
  ) {
    this.userInfo = this.storageService.GetUserInfo();

    this.userName = this.userInfo.first_name;
    this.user = this.userInfo.userId;
    this.userEmail = this.userInfo.email;

   }

  ngOnInit() {
  }


  logoutUser(){
    this.storageService.removeDataFormStorage();
    this.awsCognitoService.redirectToSignPage();
  }


}
