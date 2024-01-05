import { Injectable,EventEmitter } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  claimData:Subject<any> = new Subject();
  staticData:Subject<any> = new Subject();
  claimBlankForm:Subject<any> = new Subject();
  confirmationResponce:Subject<any> = new Subject();
  emailExists:Subject<any> = new Subject();
  saveClaimResponce:Subject<any> = new Subject();
  claimStaticData:any={};

  constructor() { }

  setClaimData(responce:any){
    this.claimData.next(responce);
  }
  setStaticData(responce:any){
    this.staticData.next(responce)
  }
  setClaimNewForm(responce:any){
    this.claimBlankForm.next(responce)
  }
  shareConfirmationResponce(responce:boolean){
    this.confirmationResponce.next(responce);
  }
  shareCheckEmailExists(responce:any){
    this.emailExists.next(responce)
  }
  setSaveClaimResponce(responce:any){
    this.saveClaimResponce.next(responce)
  }
  setClaimStaticData(responce:any){
    this.claimStaticData = responce;
  }
  getClaimStaticData(){
    return this.claimStaticData;
  }

  //End For App


}
