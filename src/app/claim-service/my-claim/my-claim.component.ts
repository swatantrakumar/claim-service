import { Component, Input, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import * as moment from 'moment';
import { DataShareService } from '../../services/data-share-service/data-share.service';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/services/storage-service/storage.service';
import { AuthDataShareService } from 'src/app/services/data-share-service/auth-data-share/auth-data-share.service';
import { ApiService } from 'src/app/services/api-service/api.service';
import { NotificationService } from 'src/app/services/notify/notification.service';

@Component({
  selector: 'lib-my-claim',
  templateUrl: './my-claim.component.html',
  styleUrls: ['./my-claim.component.css']
})
export class MyClaimComponent implements OnInit {

  @Input() activeTabName:any;

  myShortName = 'mc';
  CATEGORY_SELECTION:boolean=false;
  OnlineFormGrid:boolean=true;
  formSelection:any='';
  selectedForm:string='';
  subSourceList:any=[];
  popUpWindow="NONE";
  hideDropDown:boolean=true;
  showIdDetails:boolean=false;
  showCinDetails:boolean=false;
  claimModeByClass:boolean=false;
  claimModeByBank:boolean=false;
  showDeclaration:boolean=false;
  showVerification:boolean=false;
  in_progess_for_claimform_submit:boolean=false;

  selectRowData:any={}
  claim_form:any={}
  claimObj:any = {};
  paymentDetails:any=[];




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
    private dataShareService:DataShareService,
    private storageService:StorageService,
    private authDataShareService:AuthDataShareService,
    private apiService:ApiService,
    private notificationService:NotificationService
  ) {
    this.claimObj.amountAttribute = [{
        type: '',
        claimAmount: '',
        approvedAmount: '',
        incInVoting: false,
        comment: ['']
    }];
    this.claimObj.document = [];
    this.claimObj.unitDetails={}
    this.claimObj.paymentDetails=[];
    this.paymentDetails=[];
    this.claimDataSubscription = this.dataShareService.claimData.subscribe(data =>{
      this.setClaimData(data)
    })
    this.authDataShareService.activeCaseId.subscribe(id=>{
      this.showMyClaimForms();
    })
    this.dataShareService.claimBlankForm.subscribe(data =>{
      this.setClaimBlankForm(data);
    })
    this.dataShareService.saveClaimResponce.subscribe(res =>{
      this.in_progess_for_claimform_submit = false;
      this.claim_form = res.success;
      if(res.type && res.type == "SUBMIT"){
        this.showMyClaimForms()
        this.notificationService.notify('bg-success',"Claim Form Submitted Successfully!!!");
      }
    })
   }

  ngOnInit() {
  }
  showMyClaimForms(){
    this.OnlineFormGrid=true;
    this.CATEGORY_SELECTION=false;
    this.formSelection='';
    this.selectedForm='';
    this.claim_form.authorised_person='';
    this.popUpWindow="NONE";
    this.hideDropDown=true;
    this.showIdDetails=false;
    this.showCinDetails=false;
    this.claimModeByClass=false;
    this.claimModeByBank=false;
    this.showDeclaration=false;
    this.showVerification=false;
  }
  activeSection(){
    if(this.OnlineFormGrid==true){
      this.OnlineFormGrid=false;
      //this.formSection=true;
      this.CATEGORY_SELECTION=true;
    }
  }
  setClaimData(data:any){
    this.rowData = data;
  }

  sourceList(){
      let activecase = this.storageService.GetActiveCase();
      if(activecase && activecase.caseType && activecase.caseType == 'Home Buyers'){
          return {"FC":"Financial Creditor"}
      }else{
          return {"FC":"Financial Creditor", "OC":"Operational Creditor","EC":"Employee & Workmen"}
      }
   }
   findTheForm(value:any){
      this.selectedForm = '';
      let activecase = this.storageService.GetActiveCase();
      if(activecase && activecase.caseType && activecase.caseType == 'Home Buyers'){
        this.subSourceList=['Banks','Home Buyers'];
      }else{
          switch(value){
            case 'FC':
              this.subSourceList=['Banks','NBFC','Banks(Authorised Rep)','NBFC(Authorised Rep)','Home Buyers','Home Buyers(Authorised Rep)','Commercial Buyer','Commercial Buyer(Authorised Rep)'];
              break;
            case 'OC':
              this.subSourceList=['Operational Creditor','Others'];
              break;
            case 'EC':
              this.subSourceList=['Employee & Workmen','Employee & Workmen(Authorised Rep)'];
              break;
          }
      }
   }

   formPopUpWindow(editClaim?:any){
      //this.stepsModel ={};
      if( this.formSelection=='FC' && this.selectedForm=='Home Buyers' && this.activeTabName != 'REVIEWAPPROVAL'){
          this.popUpWindow="CA";
          this.showIdDetails=true;
          this.showCinDetails=false;
          this.claimModeByBank=false;
          this.claimModeByClass=true;

    }
    else if(this.formSelection=='FC' && this.selectedForm=='Home Buyers' && this.activeTabName == 'REVIEWAPPROVAL'){
        this.popUpWindow="CA_APPROVAL";
        this.showIdDetails=true;
        this.showCinDetails=false;
        this.claimModeByBank=false;
        this.claimModeByClass=true;
    }
    else if(this.formSelection=='FC' && this.selectedForm=='Commercial Buyer'){
          this.popUpWindow="CA";
          this.claimModeByBank=false;
          this.claimModeByClass=true;
          this.showIdDetails=true;
          this.showCinDetails=false;
          // this.finCreditor.ownership=100;
    }else if( this.formSelection=='FC' && this.selectedForm=='Home Buyers(Authorised Rep)'){
          this.popUpWindow="CA";
          this.showIdDetails=true;
          this.showCinDetails=false;
    }else if(this.formSelection=='FC' && this.selectedForm=='Commercial Buyer(Authorised Rep)'){
          this.popUpWindow="CA";
          this.showIdDetails=true;
          this.showCinDetails=false;
          // this.finCreditor.ownership=100;
    }else if(this.formSelection=='FC' && this.selectedForm=='Banks'){
          this.popUpWindow="C";
          this.showIdDetails=false;
          this.showCinDetails=true;
              this.claimModeByBank=true;
              this.claimModeByClass=false;
            //   this.finCreditor.ownership=100;
    }else if(this.formSelection=='FC' && this.selectedForm=='NBFC'){
          this.popUpWindow="C";
          this.showIdDetails=false;
          this.showCinDetails=true;
            this.claimModeByBank=true;
            this.claimModeByClass=false;
            // this.finCreditor.ownership=100;
    }else if(this.formSelection=='FC' && this.selectedForm=='Banks(Authorised Rep)'){
          this.popUpWindow="C";
          this.showIdDetails=false;
          this.showCinDetails=true;
            // this.finCreditor.ownership=100;
    }else if(this.formSelection=='FC' && this.selectedForm=='NBFC(Authorised Rep)'){
          this.popUpWindow="C";
          this.showIdDetails=false;
          this.showCinDetails=true;
            // this.finCreditor.ownership=100;
    }else if(this.formSelection=='OC' && this.selectedForm=='Operational Creditor'){
          this.popUpWindow="B";
            // this.finCreditor.ownership=100;
    }else if(this.formSelection=='OC' && this.selectedForm=='Others'){
          this.popUpWindow="F";
            // this.claimModeByOther=true;
            // this.finCreditor.ownership=100;
    }else if(this.formSelection=='EC' && this.selectedForm=='Employee & Workmen'){
            this.popUpWindow="D";
            // this.claimModeByEmployee=true;
            // this.finCreditor.ownership=100;
    }else if(this.formSelection=='EC' && this.selectedForm=='Employee & Workmen(Authorised Rep)'){
            this.popUpWindow="E";
            // this.finCreditor.ownership=100;
    }
    if(!editClaim){
        this.getNewBlankForm();
      }

      this.claim_form.formName=this.popUpWindow;
      // this.showForm=true;
      this.showDeclaration=false;
      this.showVerification=false;
      this.hideDropDown=false;
      this.CATEGORY_SELECTION=false;
  }
  getNewBlankForm(){
    let payload = {
      path:this.storageService.GetActiveCaseId(),
      data : {log:this.storageService.getUserLog()}
    }
    this.apiService.getNewClaimForm(payload);
  }
  setClaimBlankForm(data:any){
    this.claim_form = data;
    this.claim_form.catClass=this.selectedForm;
    this.claim_form.category=this.formSelection;
    this.claim_form.formName=this.popUpWindow;
  }
   editClaimForm(){

   }
   previewFormWindow(){

   }
   viewDetail(){

   }
   onSelectionChanged(obj:any){
    console.log(obj)
   }
   onRowSelected(event:any){
    this.selectRowData = event.node.data;
   }
   returnSelectedItem(){
    console.log("double click")
   }
   get_authorised_persons(){
    return this.storageService.get_authorised_persons();
   }

}
