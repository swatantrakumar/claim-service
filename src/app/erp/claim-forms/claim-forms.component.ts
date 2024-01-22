import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonFunctionService } from 'src/app/services/common-function/common-function.service';
import { AuthDataShareService } from 'src/app/services/data-share-service/auth-data-share/auth-data-share.service';
import { DataShareService } from 'src/app/services/data-share-service/data-share.service';
import { ModelService } from 'src/app/services/model/model.service';
import { StorageService } from 'src/app/services/storage-service/storage.service';

@Component({
  selector: 'lib-claim-forms',
  templateUrl: './claim-forms.component.html',
  styleUrls: ['./claim-forms.component.css']
})
export class ClaimFormsComponent implements OnInit {

  pageNo:number=1;
  pageSize:number=1000;
  myShortName = 'bos';
  ACTIVE_TAB='DASHBOARD';
  selectedRowData:any;
  claimDocument:any=[]
  tabName='DASHBOARD';
  claimColumnDefs:ColDef[] = [
    {headerName: "Claim ID", field: "serialId", lockPosition: true},
            {headerName: "Doc's",  cellRenderer: this.ageCellRendererFunc, lockPosition: true},
            {headerName: "Claim Status", field: "formStatus", lockPosition: true},
            {headerName: "Creditor Name", field: "primaryClaimant.name",lockPosition: true},
            {headerName: "Class", field: "catClass", lockPosition: true},
            {headerName: "Principle", field: "amount", lockPosition: true},
            {headerName: "Interest", field: "interest", lockPosition: true},
            {headerName: "Penalty", field: "penalty",lockPosition: true},
            {headerName: "Total", field: "total", lockPosition: true},
            {headerName: "Rejected Amount", field: "rejectedTotal", lockPosition: true},
            {headerName: "In Review Amount", field: "inReviewTotal",lockPosition: true},
            {headerName: "Approved Amount",field: "approvedTotal", lockPosition: true},
	];
	claimRowData:any = [];
  dashColumnDefs:ColDef[] = [
    {headerName: "Creditor Type",field:"category", lockPosition: true},
    {headerName: "Creditor Class",field:"catClass", lockPosition: true},
    {headerName: "Total Claimants",field:"count", lockPosition: true},
    {headerName: "Total Claim",field:"amount", lockPosition: true, resizable: false},
    {headerName: "Admitted Claim",field:"approvedAmount", lockPosition: true},
    {headerName: "Rejected Claim",field:"rejectedAmount", lockPosition: true},
    {headerName: "Under Review",field:"inReviewAmount", lockPosition: true},
	];
	dashRowData:any = [];
  defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    filter: true,
    width: 150,
    editable: false
  };
  themeClass: string ="ag-theme-bootstrap";
  claimModels ={
    "BANK_NBFC" : "Financial Creditor" ,
    "HOME_BUYER" : "Home Buyer" ,
    "OPERATIONAL" : "Operational" ,
    "EMPLOYEE" : "Employee & Workmen" ,
    "OTHERS" : "Other"
    };
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
  ) { }

  ngOnInit() {
  }
  inite(){
    this.getClaimFormDetails();
    // this.openDeficiencyPage();
    // this.getClaimStaticDataForTheCase();
    this.getAggregatedClaims()
  }
  getSelectedFilenameForUpload(){
    if(!this.claimDocument || this.claimDocument==0){
      return " Choose File ";
    }else{
        return this.claimDocument[0].fileName;
    }
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
  selectedIndex:any;
  onSelectionChanged() {
    this.userEdit = 'EDIT';
    const selectedRows = this.gridApi.getSelectedRows();
    this.selectedRowData = selectedRows[0];
    var selectedNodes = this.gridApi.api.getSelectedNodes();
    if(this.selectedRowData.joiningDate){
      this.selectedRowData.joiningDate=new Date(this.selectedRowData.joiningDate)
    }
    if(this.selectedRowData.resignationDate){
      this.selectedRowData.resignationDate=new Date(this.selectedRowData.resignationDate)
    }
    if(this.selectedRowData.promotionDate){
      this.selectedRowData.promotionDate=new Date(this.selectedRowData.promotionDate)
    }
    this.selectedIndex = selectedNodes[0].id;

  }
  closeModel(){
    this.userEdit = '';
    this.getData();
  }
  escapeFromPage(){

  }
  openClaimEntityForm(mode:any){

  }
  openReviewAndApproval(selectedRowData:any, selectedIndex:any){

  }

  onlineClaimPopUpWindow(){

  }
  exportClaimToExcel(data?:any){

  }
  isDownloading(){
    return true;
  }
  openDeleteWindow(index:any){

  }
  downloadTemplate(){

  }
  uploadFromTemplate(){

  }
  activeTab(tabName:string){

  }
  ageCellRendererFunc(params:any) {
    params.this.openClaimFormFolder = this.openClaimFormFolder;
    return '<div class="text-center"><img ng-click="openClaimFormFolder(data)" style="width: 20px;height: 20px !important;" src="img/folder.png"></div>';
  }
  openClaimFormFolder(form:any,type:any){
    // $scope.onlineFolder=false;
    // $scope.claimFormFolder ={};
    //     CommonUtilService.getClaimFormFolder(form,'claim_folder')
    //     .success(function(data,status){
    //         if(data && data._id){
    //             $scope.claimFormFolder=data;
    //              $scope.setCurrentState();
    //              claimManagementScope.criteria={};
    //              claimManagementScope.criteria.folder = $scope.claimFormFolder;
    //               if( $scope.reviewAndApproval=='REVIEW_APPROVAL'){
    //                                        $('#claimReviewAndApprove').modal('hide');
    //                                        claimManagementScope.activeModal='#claimReviewAndApprove';
    //                                       }
    //              $scope.$emit('openDocumentPopUp',claimManagementScope);
    //             safeApply($scope);
    //         }
    //     })
  }
  userFormList:any=[];
  displayList:any=[];
  search:any = {};

  getClaimFormDetails(){
    this.userFormList = [];
    this.displayList = [];
    var criteria:any = {};
    criteria.searchCriteria = [];
    if (this.tabName!=='DASHBOARD') {
       criteria.searchCriteria.push(this.commonFunctionService.getNewCriteriaAsString("claimModel", "eq", this.tabName,"-createdDate"));
    }
     if ( this.search.claimId) {
         criteria.searchCriteria.push(this.commonFunctionService.getNewCriteriaAsString("serialId", "cnts", this.search.claimId.toUpperCase()));
     }
     if ( this.search.creditorName) {
         criteria.searchCriteria.push(this.commonFunctionService.getNewCriteriaAsString("primaryClaimant.name", "cnts", this.search.creditorName.toUpperCase()));
     }
     if ( this.search.status) {
          criteria.searchCriteria.push(this.commonFunctionService.getNewCriteriaAsString("formStatus", "cnts", this.search.status.toUpperCase()));
     }
      // CommonUtilService.getClaimFormDetails(criteria,false,true,0,15000)
      // .success(function(data,status){
      //     $scope.displayList=data;
      //   /* if($scope.displayList && $scope.displayList.length>0){
      //       $scope.claimGridOptions.api.setRowData($scope.displayList);
      //     }*/
      //     $scope.claimGridOptions.api.setRowData($scope.displayList);
      //     if($scope.tabName=="BANK_NBFC"){
      //     $scope.calculateTotalCOCAmount($scope.displayList);
      //     }
      //     safeApply($scope);
      // })
      // .error(function(data,status){
      //     $.notify("Error occured while fetching claims..", "error");
      // })
  }
  aggregateList:any=[];
  getAggregatedClaims(){
    this.aggregateList=[]
    // CommonUtilService.fetchDashBoardData().success(function(data){
    //     if(data ){

    //         $scope.aggregateList=data.data;
    //          $scope.dashboardGridOptions.api.setRowData($scope.aggregateList);


    //     }
    // })

  }
}
