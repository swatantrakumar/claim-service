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
  fileUploadResponce:Subject<any> = new Subject();
  fileRemoveResponce:Subject<any> = new Subject();
  fileDownloadResponce:Subject<any> = new Subject();
  formExist:Subject<any> = new Subject();
  nextForm:Subject<any> = new Subject();
  claimStatus:Subject<any> = new Subject();
  userAddResponce:Subject<any> = new Subject();
  claimFromDetails:Subject<any> = new Subject();
  claimFormDashbordData:Subject<any> = new Subject();
  previewModelHtml:Subject<any> = new Subject();
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
  shareFileUploadResponce(responce:any){
    this.fileUploadResponce.next(responce);
  }
  shareFileRemoveResponce(responce:any){
    this.fileRemoveResponce.next(responce);
  }
  shareFileDownloadResponce(responce:any){
    this.fileDownloadResponce.next(responce);
  }
  claimFormExist(exist:boolean){
    this.formExist.next(exist);
  }
  claimNextForm(next:boolean){
    this.nextForm.next(next);
  }
  shareClaimStatusResponce(responce:any){
    this.claimStatus.next(responce);
  }
  shareUserAddOrUpdateResponce(responce:any){
    this.userAddResponce.next(responce);
  }
  shareClaimFormDetailsResponce(responce:any){
    this.claimFromDetails.next(responce)
  }
  shareDashboardDataResponce(responce:any){
    this.claimFormDashbordData.next(responce);
  }
  sharePreviewModelHtmlResponce(responce:any){
    this.previewModelHtml.next(responce);
  }
  //End For App


}
