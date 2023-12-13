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
  myShortName = 'mc';
  columnDefs:ColDef[] = [
		{headerName: "Form Id", field: "serialId", lockPosition: true,width: 173},
        {headerName: "Claim Id", field: "claimSerialId",  lockPosition: true,width: 198},
        {headerName: "Primary Claimant", field: "primaryClaimant.name",  lockPosition: true,width: 198},
        {headerName: "Claimant Email", field: "primaryClaimant.email",  lockPosition: true,width: 198},
        {headerName: "Form Name", field: "formName",  lockPosition: true,width: 150},
        {headerName: "Category", field: "category",  lockPosition: true,filter:false,width: 94},
        {headerName: "Class", field: "catClass",  lockPosition: true,filter:false,width: 94},
        {headerName: "Total Claim", field: "total",  lockPosition: true},
        {headerName: "Submission Date", field: "claimDate",   valueFormatter: function (params) {
                  return moment(params.value).format('DD/MM/YYYY');
               },  lockPosition: true,filter:false},
        {headerName: "Approved Amount", field: " ",  lockPosition: true,width: 97},
        {headerName: "Status", field: "formStatus",  lockPosition: true, resizable: false,width: 112}
	];
	rowData:any = [];
  defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    filter: true
  };
  popupParent: HTMLElement | null = document.body;
  themeClass: string ="ag-theme-bootstrap";
  claimDataSubscription:Subscription | undefined
  constructor(
    private dataShareService:DataShareService
  ) {
    this.activeTabName = 'MYCLAIM';
    this.claimDataSubscription = this.dataShareService.claimData.subscribe(data =>{
      this.setClaimData(data)
    })
   }

  ngOnInit() {
  }
  activeTab(tabName:string){
    this.activeTabName = tabName;
  }
  activeSection(){
    console.log('submit claim');
  }
  setClaimData(data:any){
    this.rowData = data;
  }

}

