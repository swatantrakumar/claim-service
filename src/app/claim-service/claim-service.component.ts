import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import * as moment from 'moment';
import { DataShareService } from '../services/data-share-service/data-share.service';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/services/storage-service/storage.service';
import { CommonFunctionService } from 'src/app/services/common-function/common-function.service';

@Component({
  selector: 'app-claim-service',
  templateUrl: './claim-service.component.html',
  styleUrls: ['./claim-service.component.css']
})
export class ClaimServiceComponent implements OnInit {
  activeTabName:string='';

  constructor(
    private dataShareService:DataShareService,
    private storageService:StorageService,
    private commonFunctionService:CommonFunctionService
  ) {
    this.activeTabName = 'MYCLAIM';

   }

  ngOnInit() {
  }
  activeTab(tabName:string){    this.activeTabName = tabName;
    if(this.activeTabName=='MYCLAIM'){
      this.commonFunctionService.getClaimDataFormCaseId(this.storageService.GetActiveCaseId());
    }
   
    // if($scope.activeTabName=='CLAIMSTATUS'){
    //   $scope.getClaimStatusDetails('n');
    // }else{
    //     $scope.activeTabName=tab;
    //     $scope.showMyClaimForms()
    // }

  }
  chagneTab(name:string){
    this.activeTabName = name;
  }



}

