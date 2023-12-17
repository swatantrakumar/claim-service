import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthDataShareService } from './../../services/data-share-service/auth-data-share/auth-data-share.service';
import { StorageService } from './../../services/storage-service/storage.service';
import { ApiService } from 'src/app/services/api-service/api.service';

@Component({
  selector: 'app-case-search',
  templateUrl: './case-search.component.html',
  styleUrls: ['./case-search.component.css']
})
export class CaseSearchComponent implements OnInit {

  cases:any=[];
  selectedCaseId:any='';

  caseListSubscription:Subscription | undefined;

  constructor(
    private storageService:StorageService,
    private authDataShareService:AuthDataShareService,
    private apiServie:ApiService
  ) {
    let cases = this.storageService.GetCaseList();
    this.setCases(cases);
    this.caseListSubscription = this.authDataShareService.caseList.subscribe(data =>{
      this.setCases(data);
    })
   }

  ngOnInit() {
  }

  setCase(){
    this.storageService.SetActiveCase(this.selectedCaseId);
    this.authDataShareService.setActiveCase(this.selectedCaseId);
    this.getClaimDataFormCaseId(this.selectedCaseId);
  }
  setCases(cases:any){
    if(cases && cases.length >0){
      this.cases = cases;
      this.selectedCaseId = this.cases[0]._id;
      this.storageService.SetActiveCase(this.selectedCaseId);
      this.authDataShareService.setActiveCase(this.selectedCaseId);
      this.getClaimDataFormCaseId(this.selectedCaseId);
    }
  }
  getClaimDataFormCaseId(id:string){
    let log = this.storageService.getUserLog();
    let payload = {
      _id : id,
      data: {log:log}
    }
    this.apiServie.getClaimData(payload);
  }

}
