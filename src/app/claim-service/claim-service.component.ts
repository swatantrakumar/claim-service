import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import * as moment from 'moment';
import { DataShareService } from '../services/data-share-service/data-share.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-claim-service',
  templateUrl: './claim-service.component.html',
  styleUrls: ['./claim-service.component.css']
})
export class ClaimServiceComponent implements OnInit {
  activeTabName:string='';

  constructor(
    private dataShareService:DataShareService
  ) {
    this.activeTabName = 'MYCLAIM';

   }

  ngOnInit() {
  }
  activeTab(tabName:string){
    this.activeTabName = tabName;
    // if($scope.activeTabName=='CLAIMSTATUS'){
    //   $scope.getClaimStatusDetails('n');
    // }else{
    //     $scope.activeTabName=tab;
    //     $scope.showMyClaimForms()
    // }
  }



}

