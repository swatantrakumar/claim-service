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
  //End For app functions


}
