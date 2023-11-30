import { Injectable } from '@angular/core';
import { EndPoint } from '../../shared/enums/end-point.enum';
import { StorageTokenStatus } from '../../shared/enums/storage-token-status.enum';
import { StorageService } from '../storage-service/storage.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EnvService {
  requestType: any = '';
  constructor(
    private storageService: StorageService
  ) { }


  getBaseUrl(){
    let baseUrl:any;
    baseUrl = environment.serverhost+'/rest/';
    return baseUrl;
  }
  baseUrl(applicationAction: string) {
    return this.getBaseUrl() +  (<any>EndPoint)[applicationAction];
  }
  publicBaseUrl(applicationAction: string) {
      return this.getBaseUrl() + EndPoint.PUBLIC + (<any>EndPoint)[applicationAction];
  }
  getApi(apiName:string){
    let api;
    if(this.getRequestType() == 'PUBLIC'){
        api = this.publicBaseUrl(apiName)
    }else{
        api = this.baseUrl(apiName)
    }
    return api;
  }
  getAuthApi(apiName:string){
    let api;
    api = this.baseUrl(apiName)
    return api;
  }
  setRequestType(type:any) {
    this.requestType = type;
  }
  getRequestType() {
    if(this.requestType == ''){
      if(this.checkLogedIn()){
        this.requestType = "PRIVATE";
      }else{
        this.requestType = "PUBLIC";
      }
    }
    return this.requestType;
  }
  checkLogedIn(){
    if (this.storageService != null && this.storageService.GetIdToken() != null) {
      if(this.storageService.GetIdTokenStatus() == StorageTokenStatus.ID_TOKEN_ACTIVE){
        return true;
      }else{
        return false;
      }
    }
    return false;
  }




}
