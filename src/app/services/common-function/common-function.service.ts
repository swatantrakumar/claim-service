import { Injectable } from '@angular/core';
import { StorageService } from '../storage-service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class CommonFunctionService {

constructor(
  private storageService:StorageService
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
}
