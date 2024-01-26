import { KeyValue } from '@angular/common';
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
  selectedRowData:any="";
  claimDocument:any=[]
  tabName='DASHBOARD';
  claimColumnDefs:ColDef[] = [
    {headerName: "Claim ID", field: "serialId", lockPosition: true},
    {headerName: "Doc's",  cellRenderer: this.ageCellRendererFunc, lockPosition: true},
    {headerName: "Claim Status", field: "formStatus", lockPosition: true},
    {headerName: "Creditor Name", field: "primaryClaimant.name",lockPosition: true},
    {headerName: "Category", field: "category", lockPosition: true},
    {headerName: "Class", field: "catClass", lockPosition: true},
    {headerName: "Principle", field: "amount", lockPosition: true},
    {headerName: "Interest", field: "interest", lockPosition: true},
    {headerName: "Penalty", field: "penalty",lockPosition: true},
    {headerName: "Total", field: "total", lockPosition: true},
            // {headerName: "Rejected Amount", field: "rejectedTotal", lockPosition: true},
            // {headerName: "In Review Amount", field: "inReviewTotal",lockPosition: true},
            // {headerName: "Approved Amount",field: "approvedTotal", lockPosition: true},
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
  oldclaimModels ={
    "BANK_NBFC" : "Financial Creditor" ,
    "HOME_BUYER" : "Home Buyer" ,
    "OPERATIONAL" : "Operational" ,
    "EMPLOYEE" : "Employee & Workmen" ,
    "OTHERS" : "Other"
    };
    claimModels ={
      "SUBMITTED" : "Submitted" ,
      "RESUBMITTED" : "Re-Submitted" ,
      "ONHOLD" : "On Hold" ,
      "ACCEPTED" : "Accepted"
      };
  gridApi:any;
  dashboardGridOptions:any;
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
    this.dataShareService.claimFromDetails.subscribe(data =>{
      this.displayList=data;
      this.gridApi.setRowData(this.displayList);
      if(this.tabName=="BANK_NBFC"){
        this.calculateTotalCOCAmount(this.displayList);
      }
    })
    this.dataShareService.claimFormDashbordData.subscribe(data=>{
      if(data ){
        this.aggregateList=data.data;
        this.dashboardGridOptions.setRowData(this.aggregateList);
      }
    })
    this.authDataShareService.activeCaseId.subscribe(id=>{
      if(this.tabName == "DASHBOARD"){
        this.getAggregatedClaims();
      }else{
        this.getClaimFormDetails();
      }
    })
   }

  ngOnInit() {
    this.inite();
  }
  inite(){
    //this.getClaimFormDetails();
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
  onDashbordGridReady(params: any){
    this.dashboardGridOptions = params.api;
    params.api.sizeColumnsToFit();
  }
  selectedIndex:any;
  onSelectionChanged() {
    this.userEdit = 'EDIT';
    const selectedRows = this.gridApi.getSelectedRows();
    this.selectedRowData = selectedRows[0];
    var selectedNodes = this.gridApi.getSelectedNodes();
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
    // if(form){
    //   $scope.claim_form=CommonUtilService.cloneObject(form);
    // }else{
    //   if($scope.selectedIndex>=0){
    //     $scope.claim_form=CommonUtilService.cloneObject($scope.displayList[$scope.selectedIndex]);
    //   }
    // }
    // CommonUtilService.reformatDates("claimform",$scope.claim_form)
    // $scope.reviewAndApproval='REVIEW_APPROVAL';
    // $('#claimReviewAndApprove').modal('show');
    // $scope.selectedIndex=index;
    // $scope.getCalculationFolder(form);
    // $scope.getConversation();
    // safeApply($scope);
    this.modelService.open("REVIEW_APPROAL",{});
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
    if(!tabName)tabName=this.tabName;
    this.tabName=tabName;
    if(this.tabName=='DASHBOARD'){
      this.getAggregatedClaims()
    }else{
      this.getClaimFormDetails();
    }
  }
  ageCellRendererFunc(params:any) {
    // params.this.openClaimFormFolder = this.openClaimFormFolder;
    return '<div class="text-center"><img ng-click="openClaimFormFolder(data)" style="width: 20px;height: 20px !important;" src="./assets/img/folder.png"></div>';
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
       criteria.searchCriteria.push(this.commonFunctionService.getNewCriteriaAsString("formStatus", "eq", this.tabName,"-createdDate"));
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
     let payload = this.commonFunctionService.populateSeacrchCriteriaAndSendCall('claimform', criteria,false,true,0,15000);
     this.apiServie.getClaimFormDetails(payload);
  }
  aggregateList:any=[];
  getAggregatedClaims(){
    this.aggregateList=[]
    var kvp:any = {};
    kvp.value = 'claimsummary';
    kvp.key = this.storageService.getRefCode();
    kvp.key2 = this.storageService.getUserAppId();
    kvp.key3 = this.storageService.GetActiveCaseId();
    this.commonFunctionService.setClientLog(kvp);
    this.apiServie.fetchDashBoardData(kvp);
  }
  calculateTotalCOCAmount(data:any){
    var totalClaim:any=0 ;
    var list=[];
    list=data;
    for(var i=0;i<list.length;i++){
      var value= list[i]
      if(value.incInVoting){
        totalClaim = parseFloat(totalClaim)+parseFloat(value.approvedTotal);
      }
    }
    this.gridApi.forEachNode((node:any)=>{
      node.data.votingpc = (node.data.incInVoting && totalClaim>0)? parseFloat((node.data.approvedTotal*100/totalClaim).toFixed(2)) + ' %': ( 0 + ' %');
    })
    this.gridApi.refreshCells();
   }
   onCompare( _right: KeyValue<any, any>,_left: KeyValue<any, any>): number {
    return 1;
  }

}
