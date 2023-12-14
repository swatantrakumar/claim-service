import { Injectable } from '@angular/core';
import { StorageTokenStatus } from '../../shared/enums/storage-token-status.enum';



@Injectable({
  providedIn: 'root'
})
export class StorageService {
  ID_TOKEN: string = 'ID_TOKEN';
  ACCESS_TOKEN: string = 'ACCESS_TOKEN';
  REFRESH_TOKEN: string = 'REFRESH_TOKEN';
  EXPIRY_IN:any= 'EXPIRY_IN';
  USER_KEY: string = 'USER';
  ID_TOKEN_EXPIRY_TIME: string = 'ID_TOKEN_EXPIRY_TIME';
  REFRESH_TOKEN_EXPIRY_TIME:string='REFRESH_TOKEN_EXPIRY_TIME';
  userInfo: any;
  log: any;
  refreshTokenAge:any=2505600000 //refresh token age 29 days


  constructor(

    ) { }




  setExpiresIn(expiry: any){
    let expiryTime = (expiry - 300)*1000
    localStorage.setItem(this.EXPIRY_IN, JSON.stringify(expiryTime));
    this.setIdTokenExpiry();
  }
  getExpiresIn(){
    return localStorage.getItem(this.EXPIRY_IN);
  }
  SetIdToken(token: any) {
    localStorage.setItem(this.ID_TOKEN, token);
  }
  GetIdToken() {
    return  localStorage.getItem(this.ID_TOKEN);
  }
  IsJsonString(str:any) {
      try {
          JSON.parse(str);
      } catch (e) {
          return false;
      }
      return true;
  }
  SetAccessToken(token: any) {
    localStorage.setItem(this.ACCESS_TOKEN, JSON.stringify(token));
  }
  GetAccessToken() {
    let obj = JSON.parse(<any>localStorage.getItem(this.ACCESS_TOKEN));
    if(obj && obj != null){
        return obj;
    }
  }
  SetRefreshToken(token: string) {
    localStorage.setItem(this.REFRESH_TOKEN, token);
    this.setRefreshTokenExpiry();
  }
  GetRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  GetIdTokenStatus(){
    let expired = 0;
    let expireTime = Number(localStorage.getItem(this.ID_TOKEN_EXPIRY_TIME));
    let currentTime = Date.now();
    let expiresIn24Hours = 0;

	if(expireTime > currentTime)
      expiresIn24Hours =  (((expireTime-currentTime)/1000)/3600) ;

	if(currentTime > expireTime){
      if(expireTime > 0){
        return StorageTokenStatus.ID_TOKEN_EXPIRED;  // appConstant.TOKEN_STATUS.ID_TOKEN_EXPIRED; // notify, due to expired
      }
      return  StorageTokenStatus.ID_TOKEN_NOT_CREATED; //appConstant.TOKEN_STATUS.ID_TOKEN_NOT_CREATED;  // first time loading so no notify
    } else if(expiresIn24Hours > 24){
		return StorageTokenStatus.ID_TOKEN_EXPIRED //appConstant.TOKEN_STATUS.ID_TOKEN_EXPIRED; // notify, due to expired
	}

    return StorageTokenStatus.ID_TOKEN_ACTIVE; //appConstant.TOKEN_STATUS.ID_TOKEN_ACTIVE; // not expired
  }



  GetRefreshTokenStatus(){
    let expired = 0;
    let expireTime = Number(localStorage.getItem(this.REFRESH_TOKEN_EXPIRY_TIME));
    let currentTime = Date.now();
    if(currentTime > expireTime){
      if(expireTime > 0){
        return StorageTokenStatus.REFRESH_TOKEN_EXPIRED; // appConstant.TOKEN_STATUS.REFRESH_TOKEN_EXPIRED; // notify, due to expired
      }
      return StorageTokenStatus.REFRESH_TOKEN_NOT_CREATED; // appConstant.TOKEN_STATUS.REFRESH_TOKEN_NOT_CREATED;  // first time loading so no notify
    }
    return StorageTokenStatus.REFRESH_TOKEN_ACTIVE; // appConstant.TOKEN_STATUS.REFRESH_TOKEN_ACTIVE; // not expired
  }

  SetUserInfo(user: any) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
  GetUserInfo() {
    const obj:any = JSON.parse(<any>localStorage.getItem(this.USER_KEY));
    if(obj && obj.USER){
      return JSON.stringify(obj.USER[0]);
    }else{
      return {};
    }
  }

  getUserLog() {
    const user = JSON.parse(<any>localStorage.getItem(this.USER_KEY));
    if(user && user != null && user != undefined && user.user){
      this.userInfo = user.user;
      this.log = { userId: this.userInfo.email, appId: this.getUserAppId(), refCode: this.userInfo.refCode };
      return this.log;
    }else{
      return null;
    }
  }
  getRefCode() {
    const userinfo:any = this.GetUserInfo();
    if(userinfo && userinfo.refCode){
      return userinfo.refCode;
    }
    return null;
  }
  getUserAppId(){
    const userinfo:any = this.GetUserInfo();
    if(userinfo && userinfo.appId){
      return userinfo.appId;
    }
    return null;
  }
  removeDataFormStorage() {
    localStorage.clear();
    sessionStorage.clear();
  }

  setIdTokenExpiry(){
    const startTime = Date.now();
    const expiry = Number(this.getExpiresIn());
    //const expiry = this.getExpiresIn();
    localStorage.setItem(this.ID_TOKEN_EXPIRY_TIME, ""+(startTime + expiry));
  }

  setRefreshTokenExpiry(){
    const startTime = Date.now();
    localStorage.setItem(this.REFRESH_TOKEN_EXPIRY_TIME, startTime + this.refreshTokenAge);
  }
  checkIdTokenStatus(){
    let statusWithMsg={
      "status":false,
      "msg" : ""
    };
    if (this.GetIdToken() != null) {
      if(this.GetIdTokenStatus() == StorageTokenStatus.ID_TOKEN_ACTIVE){
        statusWithMsg.status = true;
      }else{
        statusWithMsg.status = false;
      }
    }else{
      statusWithMsg.status=false;
      statusWithMsg.msg="Your are already logout !!!";
    }
    return statusWithMsg;
  }
}
