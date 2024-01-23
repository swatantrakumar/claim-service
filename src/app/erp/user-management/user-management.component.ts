import { CommonFunctionService } from './../../services/common-function/common-function.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service/api.service';
import { DataShareService } from 'src/app/services/data-share-service/data-share.service';
import { StorageService } from 'src/app/services/storage-service/storage.service';
import { AuthDataShareService } from './../../services/data-share-service/auth-data-share/auth-data-share.service';
import { ColDef } from 'ag-grid-community';
import * as moment from 'moment';
import { ModelService } from 'src/app/services/model/model.service';

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
  selectRowData:any={};
  gridApi:any;
  userEdit:string='';
  searchUserCase:string='';

  constructor(
    private apiServie:ApiService,
    private dataShareService:DataShareService,
    private modelService:ModelService,
    private authDataShareService:AuthDataShareService,
    private commonFunctionService:CommonFunctionService,
    private storageService:StorageService
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
    this.rowData = data
  }
  openPopUP(mode?:string){
    let obj = {
      'update':false,
      'data' : {}
    }
    if(mode && mode == 'UPDATE'){
      obj.update = true;
      obj.data = this.selectRowData;
    }
    this.modelService.open('USER_CREATION',obj);
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
    let payload = this.commonFunctionService.getPayload(obj);
    this.apiServie.getStaticData(payload);
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
  }

  onSelectionChanged() {
    this.userEdit = 'EDIT';
    const selectedRows = this.gridApi.getSelectedRows();
    this.selectRowData = selectedRows[0];
  }
  closeModel(){
    this.userEdit = '';
    this.getData();
  }
  returnSelectedItem(event:any){
    var selectedItem = event.data;
    if (selectedItem) {
        // userManagementScope = {};
        // userManagementScope.selectedItem = selectedItem;
        // userManagementScope.index=$scope.indexFromParty;
        // $scope.$emit('userSelected',userManagementScope);
    }
  }
  editable(){
    let permCategory=this.storageService.getUserPermissionCategory();
    return  "BACKOFFICE"===permCategory || "ORG_ADMIN"===permCategory;
  }
  userManagementAllSearch(value:any){
    var selectedNodes = this.gridApi.api.setQuickFilter(value);
  }
  escapeFromPage(){

  }

}
