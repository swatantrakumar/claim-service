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

@Injectable({
  providedIn: 'root'
})

export class AwsCognitoService {
  serverReq:boolean = false;

  constructor(
    private storageService:StorageService,
    private http:HttpClient,
    private envService:EnvService,
    private router:Router,
    private authDataShareService:AuthDataShareService
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
      },
      onFailure: (err) =>{
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
    let payload = {
      log : this.storageService.getUserLog()
    }
    this.getOnlineOpenCasesForClaimSubmission(payload)
    this.router.navigate(['/claim-service']);
  }
  getOnlineOpenCasesForClaimSubmission(payload:any){
    let api = this.envService.getAuthApi('GET_ONLINE_CASE_SUBMISSION');
    this.http.post(api, payload).subscribe(
      (respData:any) =>{
        if (respData && respData.length>0) {
          this.storageService.setCaseList(respData);
          this.authDataShareService.setCaseList(respData);

        }
      },
      (error)=>{

      }
    )
  }
  signup(payload:any){

  }
  redirectToSignPage(){
    this.router.navigate(['/signin']);
  }
  //End For app functions
}
