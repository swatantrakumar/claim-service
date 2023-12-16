import { CommonFunctionService } from './../../services/common-function/common-function.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service/api.service';
import { DataShareService } from 'src/app/services/data-share-service/data-share.service';
import { StorageService } from 'src/app/services/storage-service/storage.service';
import { AuthDataShareService } from './../../services/data-share-service/auth-data-share/auth-data-share.service';
import { ColDef } from 'ag-grid-community';
import * as moment from 'moment';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  myShortName = 'UMT';
  pageNo:number=1;
  pageSize:number=1000;

  columnDefs:ColDef[] = [
		// {headerName: "Form Id", field: "serialId", lockPosition: true,width: 173},
    // {headerName: "Claim Id", field: "claimSerialId",  lockPosition: true,width: 198},
    // {headerName: "Primary Claimant", field: "primaryClaimant.name",  lockPosition: true,width: 198},
    // {headerName: "Claimant Email", field: "primaryClaimant.email",  lockPosition: true,width: 198},
    // {headerName: "Form Name", field: "formName",  lockPosition: true,width: 150},
    // {headerName: "Category", field: "category",  lockPosition: true,filter:false,width: 94},
    // {headerName: "Class", field: "catClass",  lockPosition: true,filter:false,width: 94},
    // {headerName: "Total Claim", field: "total",  lockPosition: true},
    // {headerName: "Submission Date", field: "claimDate",   valueFormatter: function (params) {
    //           return moment(params.value).format('DD/MM/YYYY');
    //         },  lockPosition: true,filter:false},
    // {headerName: "Approved Amount", field: " ",  lockPosition: true,width: 97},
    // {headerName: "Status", field: "formStatus",  lockPosition: true, resizable: false,width: 112}

    {headerName: "UserId", field: "userId", lockPosition: true,width: 400},
    {headerName: "Name", field: "first_name",  lockPosition: true,width: 400},
    {headerName: "Mobile", field: "mobile",  lockPosition: true,width: 400},
    {headerName: "Pan", field: "pan",  lockPosition: true, resizable: false,width: 300}
	];
	rowData:any = [];
  defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    filter: true
  };
  popupParent: HTMLElement | null = document.body;
  themeClass: string ="ag-theme-bootstrap";

  constructor(
    private apiServie:ApiService,
    private dataShareService:DataShareService,
    private storageService:StorageService,
    private authDataShareService:AuthDataShareService,
    private CommonFunctionService:CommonFunctionService
  ) {
    this.getData();
    this.dataShareService.staticData.subscribe(data => {
      this.setStaticData(data);
    })
    this.authDataShareService.activeCaseId.subscribe(id=>{
      this.getData()
    })
   }

  ngOnInit() {
  }
  setStaticData(data:any){
    console.log(data)
    this.rowData = data
  }
  getData(page?:any){
    let pageNo = this.pageNo;
    if(page) pageNo = page;
    let obj = {
      orderBy : 'userId',
      pageNo:this.pageNo,
      pageSize:this.pageSize,
      value:"user"
    }
    let payload = this.CommonFunctionService.getPayload(obj);
    this.apiServie.getStaticData(payload);
  }

}
