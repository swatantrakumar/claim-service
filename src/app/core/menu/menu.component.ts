import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthDataShareService } from './../../services/data-share-service/auth-data-share/auth-data-share.service';
import { StorageService } from './../../services/storage-service/storage.service';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Router } from '@angular/router';
import { CommonFunctionService } from 'src/app/services/common-function/common-function.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  selectedCaseId:any='';
  cases:any=[];
  caseListSubscription:Subscription | undefined;

  constructor(
    private storageService:StorageService,
    private authDataShareService:AuthDataShareService,
    private commounFunctionService:CommonFunctionService,
    private apiServie:ApiService,
    private router:Router
  ) {
    let cases = this.storageService.GetCaseList();
    this.setCases(cases);
    this.caseListSubscription = this.authDataShareService.caseList.subscribe(data =>{
      this.setCases(data);
    })
   }

  ngOnInit() {
  }

  moveToId(id:string){
    this.router.navigate(['/'+id]);
  }
  setCase(){
    this.storageService.SetActiveCase(this.selectedCaseId);
    this.authDataShareService.setActiveCase(this.selectedCaseId);
    this.commounFunctionService.getClaimStaticDataForTheCase(this.selectedCaseId);
    for(let i=0;i<this.cases.length;i++){
      if(this.cases[i]._id===this.selectedCaseId){
       this.storageService.setCaseCode(this.cases[i].caseNo);
        break;
      }
  }

    //this.getClaimDataFormCaseId(this.selectedCaseId);
  }
  setCases(cases:any){
    if(cases && cases.length >0){
      this.cases = cases;
      this.selectedCaseId = this.cases[0]._id;
      let case_code = this.storageService.GetCaseCode();
      if(case_code && case_code!==""){
        for(let i=0;i<cases.length;i++){
            if(cases[i].caseNo && case_code=== cases[i].caseNo.toLowerCase()){
              this.selectedCaseId = cases[i]._id;
              break;
            }
        }
      }
     
      this.storageService.SetActiveCase(this.selectedCaseId);
      this.authDataShareService.setActiveCase(this.selectedCaseId);
      //this.getClaimDataFormCaseId(this.selectedCaseId);
    }
  }

}
