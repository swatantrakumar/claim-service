import { Component, OnInit } from '@angular/core';
import { StorageService } from './../../services/storage-service/storage.service';

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
    private storageService:StorageService
  ) {
    this.userInfo = this.storageService.GetUserInfo();
    this.userName = this.userInfo.first_name;
    this.user = this.userInfo.userId;
    this.userEmail = this.userInfo.email;
   }

  ngOnInit() {
  }

}
