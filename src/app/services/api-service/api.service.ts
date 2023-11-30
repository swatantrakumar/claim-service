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


  //End For app functions


}
