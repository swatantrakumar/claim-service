import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import * as moment from 'moment';
import { DataShareService } from '../../services/data-share-service/data-share.service';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/services/storage-service/storage.service';
import { AuthDataShareService } from 'src/app/services/data-share-service/auth-data-share/auth-data-share.service';
import { ApiService } from 'src/app/services/api-service/api.service';
import { NotificationService } from 'src/app/services/notify/notification.service';
import { CommonFunctionService } from 'src/app/services/common-function/common-function.service';
import { ModelService } from 'src/app/services/model/model.service';
import { FileHandlerService } from 'src/app/services/file-handler/fileHandler.service';
import { KeyValue } from '@angular/common';
import { FileTypeCellRendrerFrameworkComponent } from '../common/file-type-cell-rendrer-framework/file-type-cell-rendrer-framework.component';
@Component({
  selector: 'lib-my-claim',
  templateUrl: './my-claim.component.html',
  styleUrls: ['./my-claim.component.css']
})
export class MyClaimComponent implements OnInit {

  @Input() activeTabName:any;
  @Output() myClain = new EventEmitter();

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
  claimModeByEmployee:boolean=false;
  claimModeByOther:boolean=false;
  claimModeByBank:boolean=false;
  showDeclaration:boolean=false;
  showVerification:boolean=false;
  in_progess_for_claimform_submit:boolean=false;
  showForm:boolean=false;
  creditDetails:boolean=false;

  selectRowData:any={}
  claim_form:any={}
  claimObj:any = {};
  paymentDetails:any=[];
  ClaimSubmittedList=[];

  CIN_NO:boolean=false;
  fcIdentificationDetails:any=[];
  claimDetails:any=[]
  payments:any=[]
  paymentsReview:any=[];
  claimModelWindow:string='';




  columnDefs:ColDef[] = [
    {headerName: "Status", field: "formStatus",  lockPosition: true, resizable: false,width: 112},
		{headerName: "Form Id", field: "serialId", lockPosition: true,width: 173},
    {headerName: "Signed Doc's", field: "signedForm",  cellRendererFramework: FileTypeCellRendrerFrameworkComponent, lockPosition: true},
    {headerName: "Documents", field: "docList",  cellRendererFramework: FileTypeCellRendrerFrameworkComponent, lockPosition: true},
    {headerName: "Primary Claimant", field: "primaryClaimant.name",  lockPosition: true,width: 198},
    {headerName: "Claimant Email", field: "primaryClaimant.email",  lockPosition: true,width: 198},
    {headerName: "Form Name", field: "formName",  lockPosition: true,width: 150},
    {headerName: "Category", field: "category",  lockPosition: true,filter:false,width: 94},
    {headerName: "Class", field: "catClass",  lockPosition: true,filter:false,width: 94},
    {headerName: "Total Claim", field: "total",  lockPosition: true},
    {headerName: "Submission Date", field: "claimDate",   valueFormatter: function (params) {
              let val=moment(params.value).format('DD/MM/YYYY');
              if(val=='Invalid date') return "Pending";
              return val;
            },  lockPosition: true,filter:false},
    {headerName: "Approved Amount", field: " ",  lockPosition: true,width: 97}

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
  activeIndex:number=-1;
  activekey:any;

  constructor(
    private dataShareService:DataShareService,
    private storageService:StorageService,
    private authDataShareService:AuthDataShareService,
    private apiService:ApiService,
    private notificationService:NotificationService,
    private commonFunctionService:CommonFunctionService,
    private modelService:ModelService,
    private fileHandlerService:FileHandlerService
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
        this.modelService.close("SUBMITE_MODEL");
      }
    })
    this.dataShareService.fileDownloadResponce.subscribe(data =>{
      if(data){
        window.open(data);
      }
    });
    this.dataShareService.confirmationResponce.subscribe(check =>{
      if(this.activeIndex > -1){
        this.deleteDoc(check);
      }
    })
    this.dataShareService.claimStatus.subscribe(data =>{
      if(data){
        this.claim_form=data[0];
        this.ClaimSubmittedList=data;
        this.myClain.next('CLAIMSTATUS');
      }
    })

    this.dataShareService.fileRemoveResponce.subscribe(data =>{
      if(data){
        if(this.activekey == "signedForm"){
          if(this.activekey && this.claim_form[this.activekey] && this.claim_form[this.activekey].length>0){
            this.claim_form[this.activekey].splice(this.activeIndex,1);
          }
        }else{
          if(this.activekey && this.claim_form && this.claim_form.formAttachments && this.claim_form.formAttachments[this.activekey] && this.claim_form.formAttachments[this.activekey].length>0){
            this.claim_form.formAttachments[this.activekey].splice(this.activeIndex,1);
          }else{
            this.claim_form.docList.splice(this.activeIndex,1);
          }
        }
        this.commonFunctionService.saveClaimForm(this.claim_form);
        this.notificationService.notify("bg-success","Document has been removed successfully !!!");
      }else{
        this.notificationService.notify("bg-error","Error occured while removing document, Please contact admin !!!");
      }
      this.activeIndex = -1;
      this.activekey = "";
    })
    this.dataShareService.fileUploadResponce.subscribe(data =>{
      var notification = "";
      if(typeof data == "object"){
        Object.keys(data).forEach((key) => {
            let value = data[key];
            if(key !== 'data' && key!='uploadedFiles'){
                notification = notification + key + " : " + value + "; "
            }
            if(this.attachment_key && key==='uploadedFiles'){
              if(this.attachment_key == "signedForm"){
                if(!this.claim_form[this.attachment_key]){
                  this.claim_form[this.attachment_key]=[]
                }
                for(var i=0; i<value.length;i++){
                    this.claim_form[this.attachment_key].push(value[i])
                }
              }else{
                if(!this.claim_form.formAttachments[this.attachment_key]){
                    this.claim_form.formAttachments[this.attachment_key]=[]
                }
                for(var i=0; i<value.length;i++){
                    this.claim_form.formAttachments[this.attachment_key].push(value[i])
                }
              }
            }
            this.commonFunctionService.saveClaimForm(this.claim_form);
        })
      }
     // getAllFiles();
      this.notificationService.notify("bg-success",notification);
      this.fileTypes[this.fileType]=[];
      this.uploadData=[];
      this.attachment_key = "";
      if(data.data){
          //$scope.activeNode.children = data.data;
          this.claim_form.docList= data.data;
      }
      this.modelService.close("WAIT_MODEL");
    })
   }

  ngOnInit() {
    this.showMyClaimForms();
  }
  showMyClaimForms(){
    this.commonFunctionService.getClaimDataFormCaseId(this.storageService.GetActiveCaseId());
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
    this.claimModeByEmployee=false;
    this.claimModeByOther = false;
    this.showDeclaration=false;
    this.showVerification=false;
    this.showForm=false;
    this.creditDetails=false;
    this.selectRowData='';
  }
  activeSection(){
    if(this.OnlineFormGrid==true){
      this.OnlineFormGrid=false;
      //this.formSection=true;
      this.CATEGORY_SELECTION=true;
    }
  }
  isCaseClosed(){
    let activecase = this.storageService.GetActiveCase();
    if(activecase && activecase.lastSubmissionDate){
      return activecase.lastSubmissionDate < new Date().getTime();
    }
    return false;
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
      let categorySelected=false;
      if( this.formSelection=='FC' && this.selectedForm=='Home Buyers' && this.activeTabName != 'REVIEWAPPROVAL'){
          this.popUpWindow="CA";
          this.showIdDetails=true;
          this.showCinDetails=false;
          this.claimModeByBank=false;
          this.claimModeByClass=true;
          categorySelected=true;
    }
    else if(this.formSelection=='FC' && this.selectedForm=='Home Buyers' && this.activeTabName == 'REVIEWAPPROVAL'){
        this.popUpWindow="CA_APPROVAL";
        this.showIdDetails=true;
        this.showCinDetails=false;
        this.claimModeByBank=false;
        this.claimModeByClass=true;

        categorySelected=true;
    }
    else if(this.formSelection=='FC' && this.selectedForm=='Commercial Buyer'){
          this.popUpWindow="CA";
          this.claimModeByBank=false;
          this.claimModeByClass=true;
          this.showIdDetails=true;
          this.showCinDetails=false;
          categorySelected=true;
          // this.finCreditor.ownership=100;
    }else if( this.formSelection=='FC' && this.selectedForm=='Home Buyers(Authorised Rep)'){
          this.popUpWindow="CA";
          this.showIdDetails=true;
          this.showCinDetails=false;
          categorySelected=true;
          this.claimModeByBank=false;
          this.claimModeByClass=true;
    }else if(this.formSelection=='FC' && this.selectedForm=='Commercial Buyer(Authorised Rep)'){
          this.popUpWindow="CA";
          this.showIdDetails=true;
          this.showCinDetails=false;
          categorySelected=true;
          this.claimModeByBank=false;
          this.claimModeByClass=true;
          // this.finCreditor.ownership=100;
    }else if(this.formSelection=='FC' && this.selectedForm=='Banks'){
          this.popUpWindow="C";
          this.showIdDetails=false;
          this.showCinDetails=true;
              this.claimModeByBank=true;
              this.claimModeByClass=false;
              categorySelected=true;
            //   this.finCreditor.ownership=100;
    }else if(this.formSelection=='FC' && this.selectedForm=='NBFC'){
          this.popUpWindow="C";
          this.showIdDetails=false;
          this.showCinDetails=true;
            this.claimModeByBank=true;
            this.claimModeByClass=false;
            categorySelected=true;
            // this.finCreditor.ownership=100;
    }else if(this.formSelection=='FC' && this.selectedForm=='Banks(Authorised Rep)'){
          this.popUpWindow="C";
          this.showIdDetails=false;
          this.showCinDetails=true;
          categorySelected=true;
          this.claimModeByBank=true;
          this.claimModeByClass=false;
            // this.finCreditor.ownership=100;
    }else if(this.formSelection=='FC' && this.selectedForm=='NBFC(Authorised Rep)'){
          this.popUpWindow="C";
          this.showIdDetails=false;
          this.showCinDetails=true;
          categorySelected=true;
          this.claimModeByBank=true;
          this.claimModeByClass=false;
            // this.finCreditor.ownership=100;
    }else if(this.formSelection=='OC' && this.selectedForm=='Operational Creditor'){
          this.popUpWindow="B";
          categorySelected=true;
            // this.finCreditor.ownership=100;
    }else if(this.formSelection=='OC' && this.selectedForm=='Others'){
          this.popUpWindow="F";
          this.claimModeByOther=true;
          categorySelected=true;
            // this.finCreditor.ownership=100;
    }else if(this.formSelection=='EC' && this.selectedForm=='Employee & Workmen'){
            this.popUpWindow="D";
            this.claimModeByEmployee=true;
            categorySelected=true;
            // this.finCreditor.ownership=100;
    }else if(this.formSelection=='EC' && this.selectedForm=='Employee & Workmen(Authorised Rep)'){
            this.popUpWindow="E";
            categorySelected=true;
            // this.finCreditor.ownership=100;
    }
    if(categorySelected){
    if(!editClaim){
        this.getNewBlankForm();
      }

      this.claim_form.formName=this.popUpWindow;
      this.showForm=true;
      this.showDeclaration=false;
      this.showVerification=false;
      this.hideDropDown=false;
      this.CATEGORY_SELECTION=false;
    }
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
    this.claim_form=this.commonFunctionService.cloneObject(this.selectRowData);
    if(!this.claim_form.formDate) this.claim_form.formDate = new Date();
    this.formSelection=this.claim_form.category;
    this.selectedForm=this.claim_form.catClass;
    this.popUpWindow=this.claim_form.formName;
    this.commonFunctionService.reformatDates("claims", this.claim_form)
    this.activeSection();
    this.formPopUpWindow(true);

    if(!this.claim_form.primaryClaimant){
      this.creditDetails=false;
    }else{
      this.creditDetails=true;
    }
  };
  submitClaimForm(){
    let object = {
      type : "SUBMITE",
      fieldName : "signedForm"
    }
    this.claim_form=this.commonFunctionService.cloneObject(this.selectRowData);
      if(this.claim_form.resubmissionRequired){
        this.claim_form.signedForm=[];
      }
    this.modelService.open('SUBMITE_MODEL',object);
  };
   previewFormWindow(form?:any){
      if(this.activeTabName=='CLAIMSTATUS'){
        this.claim_form=this.commonFunctionService.cloneObject(form);
      }
      if(!form && this.selectRowData && Object.keys(this.selectRowData).length > 0){
        this.claim_form = this.commonFunctionService.cloneObject(this.selectRowData);
      }else{
        this.claim_form=this.commonFunctionService.cloneObject(form);
      }
      let formName = '';
      switch(this.claim_form.catClass){
        case 'Banks':
        case 'NBFC':
        case 'Banks(Authorised Rep)':
        case 'NBFC(Authorised Rep)':
          formName = 'C';
          break;

        case 'Home Buyers':
        case 'Commercial Buyer':
        case 'Commercial Buyer(Authorised Rep)':
        case 'Home Buyers(Authorised Rep)':
          formName = 'CA';
          break;
        case 'Operational Creditor':
          formName = 'B';
          break;
        case 'Others':
          formName = 'F';
          break;
        case 'Employee & Workmen':
          formName = 'D';
          break;

      }
      this.apiService.getPreviewModalHtml(this.claim_form._id);
      this.modelService.open('PREVIEW_MODEL',{'formName':formName});
   }
   viewDetail(){
    // if(this.selectRowData && this.selectRowData.claimId){
    //     this.getClaimStatusDetails(this.selectRowData.claimId);
    // }
    let object = {}
    this.modelService.open('COMMENT_MODEL',object);
   }
   getClaimStatusDetails(claimId:string){
    if(!claimId) claimId="n";
    let payload = {
      caseId : this.storageService.GetActiveCaseId(),
      id:claimId,
      data : {email : this.storageService.GetUserInfo()?.email}
    };
    this.apiService.getClaimStatusDetails(payload);
   }


   gridApi:any;
  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();
    this.selectRowData = selectedRows[0];
  }
  onCellClicked(event:any) {
    const selectedRows = this.gridApi.getSelectedRows();
    this.claim_form = this.commonFunctionService.cloneObject(selectedRows[0]);

  }
   returnSelectedItem(){
    console.log("double click")
   }
   get_authorised_persons(){
    return this.storageService.get_authorised_persons();
   }
   goNextPage(){
    let activecase = this.storageService.GetActiveCase();
    if(this.validateKeyDates("dummy")){
      this.commonFunctionService.saveClaimForm(this.claim_form);
      if(this.showForm==true){
          this.showForm=false;
          this.showDeclaration=true;
          this.showVerification=false;
      }else if( this.showDeclaration==true){
          this.showForm=false;
          this.showDeclaration=false;
          this.showVerification=true;
      }
    }
  }
  goPreviousPge(){
    if(this.showDeclaration==true ){
      this.showForm=true;
      this.showDeclaration=false;
      this.showVerification=false;
    }else if( this.showVerification==true){
      this.showForm=false;
      this.showDeclaration=true;
      this.showVerification=false;
    }
  }
  downloadFile(doc:any){
    this.commonFunctionService.setClientLog(doc);
    this.apiService.downloadDocument(doc);
  }
  deleteDocument(doc:any,index:any,key?:any){
    if(this.claim_form.formStatus == "SUBMITTED"){
      this.notificationService.notify("bg-danger","Cannot be deleted!!!");
    }else{
      if(doc){
          this.activeIndex = index;
          if(key && key != ''){
            this.activekey = key;
          }else{
            this.activekey = "docList";
          }
          let message = "Are you sure you want to delete "+ doc.rollName + " ? ";
          let obj ={
            msg : message
          }
          this.modelService.open('confirmation_modal',obj)
      }
    }
  }
  deleteDoc(check:boolean){
    if(check){
      let activeDocumentArray:any = [] ;
      //if(this.activekey == "signedForm"){
        if(this.activekey && this.claim_form[this.activekey] && this.claim_form[this.activekey].length>0){
          activeDocumentArray = this.claim_form[this.activekey];
        }
      // }else{
      //   if(this.activekey && this.claim_form.formAttachments[this.activekey] && this.claim_form.formAttachments[this.activekey].length>0){
      //       activeDocumentArray = this.claim_form.formAttachments[this.activekey];
      //   }else{
      //       activeDocumentArray=this.claim_form.docList;
      //   }
      // }
      if(activeDocumentArray && activeDocumentArray.length > 0 && this.activeIndex != -1){
        this.apiService.removeDocument(activeDocumentArray[this.activeIndex]);
      }
    }
  }

  idVerificationWindow(){
    if(!this.claim_form) this.claim_form= {}
    this.fcIdentificationDetails = this.claim_form.ids;
    switch(this.claim_form.catClass){
      case 'Banks':
      case 'Banks(Authorised Rep)':
      case 'NBFC':
      case 'NBFC(Authorised Rep)':
      case 'Operational Creditor':
      case 'Others':
        this.CIN_NO = true;
        this.modelService.open("ID_DETAILS_WINDOW",{});
        break;
      case 'Home Buyers':
      case 'Home Buyers(Authorised Rep)':
      case 'Commercial Buyer(Authorised Rep)':
      case 'Commercial Buyer':
      case 'Employee & Workmen':
      case 'Employee & Workmen(Authorised Rep)':
        this.CIN_NO = false;
        this.modelService.open("ID_DETAILS_WINDOW",{});
        break;
    }

  }
  claimModelPopUp(){
    this.claimObj={};
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
    this.commonFunctionService.claimModelPopUp(this.claim_form,this.claimDetails,this.payments,this.activeTabName,this.claimModelWindow,this.claimObj);
    //$scope.payments_update_index = -1;
  }
  creditorDetails(responce:any){
    this.creditDetails = responce;
  }

  //image handling
  uploadData:any=[]
  fileTypes:any={}
  rxFiles:any = [];
  rxid:string='';
  //rx:any = {};
  activeNode:any='';
  fileName:string='';
  attachment_key:string="";
  fileType:string='';
  setFiles(event:any, fileType:string,key?:any) {
    this.activeNode = this.claim_form.myPath;
    this.fileTypes[fileType] = [];
    this.uploadData=[];
    this.rxid = event.target.id;
    var files = event.target.files;
    this.fileName = files[0].name;
    // for (var i = 0; i < files.length; i++) {
    //     var file = files[i];
    //     this.rxFiles.push(file);
    //     var reader = new FileReader();
    //     reader.onload = this.imageIsLoaded;
    //     reader.readAsDataURL(file);
    // }
    if (files && files.length > 0) {
      const promises: Promise<{ fileName: string,fileExtn: string, innerBucketPath: string, id:string, fileData: string,size:any }>[] = [];

      for (let i = 0; i < files.length; i++) {
        var file = files[i];
        this.rxFiles.push(file);
        promises.push(this.readNoticeFile(files[i]));
      }
      Promise.all(promises)
        .then((results) => {
          // All files have been processed
          if(results && results.length > 0 && this.uploadData) {
            results.forEach(element => {
              this.uploadData.push(element);
            })
            if(this.uploadData && this.uploadData.length > 0){
              // console.log(this.uploadData);
              this.fileTypes[fileType] = this.commonFunctionService.cloneObject(this.rxFiles);
              this.uploadFile(fileType,key);
            }
          }
        })
        .catch((error) => {
          console.error('Error reading files:', error);
        });
    }

  }
  readNoticeFile(file: File): Promise<{ fileName: string,fileExtn: string, innerBucketPath: string, fileData: string,id:string,size:any }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        const dataURL = event.target.result;
        const splits = file.name.split('.');
        const fileExtn = splits[splits.length-1];
        resolve({
          fileData: dataURL.split(',')[1],
          fileName: file.name,
          id : this.rxid,
          fileExtn:  fileExtn,
          innerBucketPath: this.activeNode.key+ "/"+file.name,
          size : file.size
        });
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }


  // imageIsLoaded= (e:any) => {
  //   var rxFile = this.rxFiles[0];
  //   this.rxFiles.splice(0, 1);
  //   this.rx = {};
  //   this.rx.fileData = e.target.result;
  //   this.rx.fileData = this.rx.fileData.split(',')[1];
  //   if (rxFile.name && rxFile.name != '') {
  //       this.rx.fileName = rxFile.name;
  //       this.rx.id = this.rxid;
  //       var splits = this.rx.fileName.split('.');
  //       this.rx.fileExtn = splits[splits.length-1];
  //       this.rx.innerBucketPath = this.activeNode.key+ "/"+this.rx.fileName;
  //   } else {
  //       this.rx.fileName = rxFile.webkitRelativePath;
  //   }
  //   this.rx.size = rxFile.size;
  //   this.uploadData.push(this.rx);
  // }
  uploadFile(type:any,key?:any){
    this.attachment_key = key;
    this.fileType = type;
    this.fileHandlerService.uploadFile(this.claim_form,this.uploadData);
    // this.saveClaimForm();
  }

  getSelectedFilenameForUpload(){
    return this.fileHandlerService.getSelectedFilenameForUpload(this.uploadData);
  }
  getSelectedFilenameForUploadcustom(index:any){
    var fullId = 'inputGroupFile04_'+index;
    return this.fileHandlerService.getSelectedFilenameForUploadcustom(this.uploadData,fullId);
  }

  saveClaimForm(){
    this.commonFunctionService.saveClaimForm(this.claim_form);
  }
  onlineClaimFormPopUp(type:any){
    this.modelService.open('securityDetailsModel',{})
  }
  onlineBankAccount(){
    this.modelService.open('addBankDetailsModel',{})
  }
  commetModelResponce(respone:any){
    if(respone == 'upload'){
      let object = {
        type : "",
        fieldName : 'docList',
        title:'Documents'
      }
      this.modelService.open('SUBMITE_MODEL',object);
    }
  }
  previewModelResponce(respone:any){
    this.selectRowData = '';
  }
  submitModelResponce(respone:any){
    this.selectRowData = '';
  }
  validateKeyDates(keyDate:string){

    if(this.claim_form.promotionDate && this.claim_form.joiningDate &&  this.claim_form.promotionDate<=this.claim_form.joiningDate){
      this.notificationService.notify('bg-danger',"Joing date should be earlier than promotion date !!!");
      return false;
    }
    if(this.claim_form.resignationDate && this.claim_form.joiningDate && this.claim_form.resignationDate<=this.claim_form.joiningDate){
      this.notificationService.notify('bg-danger',"Joing date should be earlier than resignation date !!!");
      return false;
    }
    if(this.claim_form.resignationDate && this.claim_form.promotionDate && this.claim_form.resignationDate < this.claim_form.promotionDate){
      this.notificationService.notify('bg-danger',"Promotion date should be earlier than resignation date !!!");
      return false;
    }

    return true;
    }

}
