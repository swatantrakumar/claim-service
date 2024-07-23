import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthDataShareService } from './../../services/data-share-service/auth-data-share/auth-data-share.service';
import { StorageService } from './../../services/storage-service/storage.service';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonFunctionService } from 'src/app/services/common-function/common-function.service';

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
    private commounFunctionService:CommonFunctionService
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
    this.commounFunctionService.getClaimDataFormCaseId(this.selectedCaseId);
    this.commounFunctionService.getClaimStaticDataForTheCase(this.selectedCaseId);
    for(let i=0;i<this.cases.length;i++){
      if(this.cases[i]._id===this.selectedCaseId){
       this.storageService.setCaseCode(this.cases[i].caseNo);
        break;
      }
  }

  }
  setCases(cases:any){
    if(cases && cases.length >0){
      this.cases = cases;
      this.selectedCaseId = this.cases[0]._id;
      let case_code = this.storageService.GetCaseCode();
      let active_case=[];
      if(case_code && case_code!==""){
        for(let i=0;i<cases.length;i++){
            if(cases[i].caseNo && case_code=== cases[i].caseNo.toLowerCase()){
              this.selectedCaseId = cases[i]._id;
              active_case.push(cases[i]);
              this.cases=active_case;
              break;
            }
        }
      }

      this.storageService.SetActiveCase(this.selectedCaseId);
      this.authDataShareService.setActiveCase(this.selectedCaseId);
      this.commounFunctionService.getClaimDataFormCaseId(this.selectedCaseId);
      this.commounFunctionService.getClaimStaticDataForTheCase(this.selectedCaseId);
    }
  }


}
