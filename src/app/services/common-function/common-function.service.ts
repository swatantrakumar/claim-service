import { Injectable } from '@angular/core';
import { StorageService } from '../storage-service/storage.service';
import { ApiService } from '../api-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class CommonFunctionService {

constructor(
  private storageService:StorageService,
  private apiService:ApiService
) { }

getPayload(obj:any){
  let payload = {
    path : obj.orderBy,
    data :{
      log:this.storageService.getUserLog(),
      key:this.storageService.getUserAppId(),
      key2:this.storageService.getRefCode(),
      key3:this.storageService.GetActiveCaseId(),
      pageNo:(obj.pageNo-1),
      pageSize:obj.pageSize,
      value:obj.value
    }
  }
  return payload;
}
  isValidEmail(inputValue:any) {
    var pattern = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    return (pattern.test(inputValue) ? true : false);
  }
  isValidZipCode(inputValue:any) {
    var pattern = /^[0-9]{1}[0-9]{5}$/;
    return (pattern.test(inputValue) ? true : false);
  }
  cloneObject(obj:any) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
  }
  checkEmailExistedOrNot(email:string){
    var dataObj = {
        "case_id": this.storageService.GetActiveCaseId(),
        "creditors": [{
            "email" : email
        }]
    }
    this.apiService.checkEmailExist(dataObj)
  }
  removeSpecialCharacters(inputString:string) {
    if (inputString && inputString !== '') return inputString.replace(/[^a-z\d]+/gi, '');
    return '';
};
}
