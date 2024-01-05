import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, tap, switchMap, mergeMap, catchError } from 'rxjs/operators';
import { from, of, Observable } from 'rxjs';//fromPromise
import { DataShareService } from '../data-share-service/data-share.service';
import { EnvService } from '../env-service/env.service';
import { StorageService } from '../storage-service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  serverReq:boolean = false;

constructor(
  private dataShareService: DataShareService,
  private http:HttpClient,
  private envService: EnvService,
  private stroageService: StorageService
 ) { }

  getClaimData(payload:any){
    let api = this.envService.getAuthApi('GET_CLAIM_STATIC');
    this.http.post(api+'/'+payload._id,payload.data).subscribe(
      (respData:any) =>{
        if (respData) {
          this.dataShareService.setClaimData(respData);
        }
      },
      (error)=>{

      }
    )
  }
  getClaimStaticDataFromCase(payload:any){
    let api = this.envService.getAuthApi('GET_CLAIM_STATIC_DATA_FROM_CASE');
    this.http.get(api+'/'+payload._id).subscribe(
      (respData:any) =>{
        if (respData) {
          //console.log(respData);
          this.dataShareService.setClaimStaticData(respData);
        }
      },
      (error)=>{

      }
    )
  }
  getStaticData(payload:any){
    let api = this.envService.getAuthApi('GET_STATIC_DATA');
    this.http.post(api+'/'+payload.path,payload.data).subscribe(
      (respData:any) =>{
        if (respData) {
          this.dataShareService.setStaticData(respData);
        }
      },
      (error)=>{

      }
    )
  }
  getNewClaimForm(payload:any){
    let api = this.envService.getAuthApi('GET_CLAIM_NEW_FORM');
    this.http.post(api+'/'+payload.path,payload.data).subscribe(
      (respData:any) =>{
        if (respData) {
          this.dataShareService.setClaimNewForm(respData);
        }
      },
      (error)=>{

      }
    )
  }
  checkEmailExist(payload:any){
    let api = this.envService.getAuthApi('CHECK_EMAIL_EXISTS');
    this.http.post(api,payload).subscribe(
      (respData:any) =>{
        let obj = {
          status:false,
          msg:''
        }
        if(respData.success && respData.success.length > 0){
          obj.status = true;
          obj.msg = 'Email is already used please use another';
        }
        this.dataShareService.shareCheckEmailExists(obj);
      },
      (error)=>{
        let obj = {
          status:false,
          msg:'Error while fetch email details'
        }
        this.dataShareService.shareCheckEmailExists(obj);
      }
    )
  }
  saveNewClaim(payload:any){
    let api = this.envService.getAuthApi('SAVE_CLAIM');
    this.http.post(api+'/'+payload.path,payload.data).subscribe(
      (respData:any) =>{
        if (respData) {
          respData['type'] = payload.type;
          this.dataShareService.setSaveClaimResponce(respData);
        }
      },
      (error)=>{

      }
    )
  }
  //End For app functions


}
