import { AuthDataShareService } from './../../services/data-share-service/auth-data-share/auth-data-share.service';
import { Component, OnInit } from '@angular/core';
import { StorageService } from './../../services/storage-service/storage.service';
import { AwsCognitoService } from 'src/app/services/aws-cognito/aws-cognito.service';
import { Subscription } from 'rxjs';
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
  cases:any=[];
  selectedCaseId:any='';

  caseListSubscription:Subscription | undefined;


  constructor(
    private storageService:StorageService,
    private awsCognitoService:AwsCognitoService,
    private authDataShareService:AuthDataShareService,
    private apiServie:ApiService
  ) {
    this.userInfo = this.storageService.GetUserInfo();
    let cases = this.storageService.GetCaseList();
    this.setCases(cases);
    this.userName = this.userInfo.first_name;
    this.user = this.userInfo.userId;
    this.userEmail = this.userInfo.email;
    this.caseListSubscription = this.authDataShareService.caseList.subscribe(data =>{
      this.setCases(data);
    })
   }

  ngOnInit() {
  }

  setCase(){
    this.storageService.SetActiveCase(this.selectedCaseId);
    this.authDataShareService.setActiveCase(this.selectedCaseId);
    this.getClaimDataFormCaseId(this.selectedCaseId);
  }
  logoutUser(){
    this.storageService.removeDataFormStorage();
    this.awsCognitoService.redirectToSignPage();
  }
  setCases(cases:any){
    if(cases && cases.length >0){
      this.cases = cases;
      this.selectedCaseId = this.cases[0]._id;
      this.storageService.SetActiveCase(this.selectedCaseId);
      this.authDataShareService.setActiveCase(this.selectedCaseId);
      this.getClaimDataFormCaseId(this.selectedCaseId);
    }
  }
  getClaimDataFormCaseId(id:string){
    let log = this.storageService.getUserLog();
    let payload = {
      _id : id,
      data: {log:log}
    }
    this.apiServie.getClaimData(payload);
  }

}
