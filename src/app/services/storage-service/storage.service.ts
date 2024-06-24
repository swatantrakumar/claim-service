import { Injectable } from '@angular/core';
import { StorageTokenStatus } from '../../shared/enums/storage-token-status.enum';
import { elementAt } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class StorageService {
  ID_TOKEN: string = 'ID_TOKEN';
  ACCESS_TOKEN: string = 'ACCESS_TOKEN';
  REFRESH_TOKEN: string = 'REFRESH_TOKEN';
  EXPIRY_IN:any= 'EXPIRY_IN';
  USER_KEY: string = 'USER';
  STATIC_DATA:string = 'STATIC_DATA';
  CASE_LIST:string = 'CASE_LIST';
  PERMISSION_LIST:any='PERMISSION_LIST';
  ACTIVE_CASE:string='ACTIVEA_CASE';
  ID_TOKEN_EXPIRY_TIME: string = 'ID_TOKEN_EXPIRY_TIME';
  REFRESH_TOKEN_EXPIRY_TIME:string='REFRESH_TOKEN_EXPIRY_TIME';
  userInfo: any;
  log: any;
  refreshTokenAge:any=2505600000 //refresh token age 29 days

  PROJECT_MODULE:any="PROJECT_MODULE";


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
    return JSON.parse(<any>localStorage.getItem(this.USER_KEY));
    // if(obj && obj.USER){
    //   return JSON.parse(obj.USER[0]);
    // }else{
    //   return {};
    // }
  }
  setCaseList(cases:any){
    localStorage.setItem(this.CASE_LIST,JSON.stringify(cases))
  }
  GetCaseList(){
    return JSON.parse(<any>localStorage.getItem(this.CASE_LIST));
  }
  SetActiveCase(caseId:string){
    localStorage.setItem(this.ACTIVE_CASE,JSON.stringify(caseId));
  }
  GetActiveCaseId(){
    return JSON.parse(<any>localStorage.getItem(this.ACTIVE_CASE));
  }
  GetActiveCase(){
    let caseObj:any = {};
    let id = this.GetActiveCaseId();
    let caseList = this.GetCaseList();
    if(caseList && caseList.length > 0){
      caseList.forEach((element:any) => {
        if(element._id == id){
          caseObj = element;
        }
      });
    }
    return caseObj;
  }

  setPermissionList(permisssionList:any){
    localStorage.setItem(this.PERMISSION_LIST,JSON.stringify(permisssionList));
  }
  getPermissionList(){
    return JSON.parse(<any>localStorage.getItem(this.PERMISSION_LIST));
  }

  getUserLog() {
    const user = JSON.parse(<any>localStorage.getItem(this.USER_KEY));
    if(user && user != null && user != undefined){
      this.userInfo = user;
      this.log = {
        userId: this.userInfo.userId,
        appId: this.getUserAppId(),
        refCode: this.getRefCode(),
        clientId: this.userInfo.clientId,
        sessionId:this.userInfo.sessionId+";"+this.GetIdToken()
      };
      return this.log;
    }else{
      return null;
    }
  }
  getUserId(){
    const user = JSON.parse(<any>localStorage.getItem(this.USER_KEY));
    if(user && user != null && user != undefined){
      return user.userId;
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
  getUserPermissionCategory(){
    const userinfo:any = this.GetUserInfo();
    if (userinfo && userinfo.permissionCategory) {
      return userinfo.permissionCategory;
    } else {
      return "";
    }
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
  setProjectModule(module:any){
    localStorage.setItem(this.PROJECT_MODULE,module);
  }
  getProjectModule(){
    return localStorage.getItem(this.PROJECT_MODULE);
  }
  get_authorised_persons(){
    let activeCase = this.GetActiveCase();
    if(activeCase && activeCase.authorised_person){
      return activeCase.authorised_person;
    }else{
      return [];
    }
  }
  isArMandatory(): boolean{
    let activeCase = this.GetActiveCase();
    if(activeCase && activeCase.arMandatory){
      return activeCase.arMandatory;
    }else{
      return false;
    }
  }
  setStaticData(staticData:any){
    localStorage.setItem(this.STATIC_DATA, JSON.stringify(staticData));
  }
  GetStaticData() {
    return JSON.parse(<any>localStorage.getItem(this.STATIC_DATA));
  }
  GetClaimStatus(){
    let staticData = this.GetStaticData();
    if(staticData && staticData.claimstatus){
      return staticData.claimstatus;
    }else{
      return null;
    }
  }
}
