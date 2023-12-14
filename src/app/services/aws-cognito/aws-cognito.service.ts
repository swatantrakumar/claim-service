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

@Injectable({
  providedIn: 'root'
})

export class AwsCognitoService {
  serverReq:boolean = false;

  constructor(
    private storageService:StorageService,
    private http:HttpClient,
    private envService:EnvService,
    private router:Router
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
          this.storageService.SetUserInfo(respData);
          this.storageService.GetUserInfo();
          this.router.navigate(['/claim-service']);
        }
      },
      (error)=>{

      }
    )
  }
  signup(payload:any){

  }
  //End For app functions
}
