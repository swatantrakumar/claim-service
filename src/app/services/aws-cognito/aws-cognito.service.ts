import { Injectable } from '@angular/core';
import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,AuthenticationDetails
} from 'amazon-cognito-identity-js';
import { StorageService } from '../storage-service/storage.service';
import { HttpClient } from '@angular/common/http';
import { EnvService } from '../env-service/env.service';
import { Router } from '@angular/router';
import { AuthDataShareService } from '../data-share-service/auth-data-share/auth-data-share.service';
import { ModelService } from '../model/model.service';
import { NotificationService } from '../notify/notification.service';

@Injectable({
  providedIn: 'root'
})

export class AwsCognitoService {
  serverReq:boolean = false;
  countryCode ="+91";

  constructor(
    private storageService:StorageService,
    private http:HttpClient,
    private envService:EnvService,
    private router:Router,
    private authDataShareService:AuthDataShareService,
    private modelService:ModelService,
    private notificationService:NotificationService
  ) { }

  getUserPool(){
    let poolData ={
      UserPoolId: 'ap-south-1_PuAOQ3vDo', // Your user pool id here
	    ClientId: '4mnima65kbi04ulkva7umjealr', // Your client id here
    }
    let userPool = new CognitoUserPool(poolData);
    return userPool;
  }
  getUserData(email:string){
    let userData = {
        Username: email,
        Pool: this.getUserPool(),
    };
    return new CognitoUser(userData);
  }
  sigin(payload:any){
    let authenticationDetails = new AuthenticationDetails({
        Username: payload.email,
        Password: payload.password
    });
    let cognitoUser = this.getUserData(payload.email);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) =>{
        let idToken = result.getIdToken().getJwtToken();
        this.storageService.SetIdToken(idToken);
        const cognitoExpiresIn = 86400;
        this.storageService.setExpiresIn(cognitoExpiresIn);
        this.getUserWithToken(idToken);
        this.modelService.close("WAIT_MODEL");
      },
      onFailure: (err) =>{
        this.modelService.close("WAIT_MODEL");
        console.log(err)
      }
    });
  }
  getUserWithToken(payload:any){
    let api = this.envService.getAuthApi('GET_USER_PERMISSION');
    const reqBody = { key: payload };
    this.http.post(api, reqBody).subscribe(
      (respData:any) =>{
        if (respData && respData.USER) {
          this.handleUserResponceData(respData);
        }
      },
      (error)=>{

      }
    )
  }
  handleUserResponceData(respData:any){
    let userInfo = JSON.parse(respData.USER[0]);
    this.storageService.SetUserInfo(userInfo);
    this.redirectAccordingToModule();
  }
  redirectAccordingToModule(){
    let module = this.storageService.getProjectModule();
    let obj = {
      apiName : '',
      routLink: '',
      payload:{}
    }
    if(module == 'MCLMN'){
      obj.routLink = '/mclaimn';
      obj.apiName = 'GET_ONLINE_CASE_SUBMISSION';
      obj.payload = {log : this.storageService.getUserLog() }
    }else{
      obj.routLink = '/mclr';
      obj.apiName = 'GET_CASES_OR_PERMISSIO';
      obj.payload = this.storageService.getUserLog()
    }
    this.getOnlineOpenCasesForClaimSubmission(obj.payload,obj.apiName);
    this.router.navigate([obj.routLink]);
  }
  getOnlineOpenCasesForClaimSubmission(payload:any,name:string){
    let api = this.envService.getAuthApi(name);
    this.http.post(api, payload).subscribe(
      (respData:any) =>{
        if (respData) {
          this.responceHandle(respData,name);
        }
      },
      (error)=>{

      }
    )
  }
  responceHandle(respData:any,apiName:string){
    if(apiName == 'GET_ONLINE_CASE_SUBMISSION'){
      this.storageService.setCaseList(respData);
      this.authDataShareService.setCaseList(respData);
    }else{
      if(respData.CASES){
        let cases = respData.CASES;
        let permissions = respData.PERMS;
        this.storageService.setCaseList(cases);
        this.storageService.setPermissionList(permissions);
        this.authDataShareService.setCaseList(cases);
      }
    }
  }
  signup(payload:any){
    let user = payload;
    var userPool = this.getUserPool();
    var attributeList = [];
    var email = user.email.toLowerCase();
    var mobile = user.mobile.toString();
    mobile = this.countryCode + mobile;
    var dataEmail = {
        Name: 'email',
        Value: email
    };

    var dataPhoneNumber = {
        Name: 'phone_number',
        Value: mobile,
    };

    var attributeEmail = new CognitoUserAttribute(dataEmail);
    var attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);
    if (user.name) {
        var dataName = {
            Name: 'name',
            Value: user.name,
        }
        var attributeName = new CognitoUserAttribute(dataName);
        attributeList.push(attributeName);
    }
    attributeList.push(attributeEmail);
    attributeList.push(attributePhoneNumber);
    userPool.signUp(user.email, user.password, attributeList, [],
        (err, result) => {
            if (!err) {
              console.log(result);
              let userName:string = '';
              if(result && result.user) userName = result.user.getUsername();
              this.notificationService.notify('bg-success',""+userName +" Successfully Registered.")
              this.modelService.close("WAIT_MODEL");
              this.redirectToSignPage();
            } else {
              this.modelService.close("WAIT_MODEL");
              console.log(err);
            }
        }
    );
  }
  redirectToSignPage(){
    this.router.navigate(['/signin']);
  }
  //End For app functions
}


