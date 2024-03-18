import { StorageService } from 'src/app/services/storage-service/storage.service';
import { DeleteRecordService } from './../../services/claim_form/deleteRecord/deleteRecord.service';
import { CommonFunctionService } from './../../services/common-function/common-function.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { AddClaimServiceService } from 'src/app/services/claim_form/addClaimService/addClaimService.service';
import { DataShareService } from 'src/app/services/data-share-service/data-share.service';
import { ModelService } from 'src/app/services/model/model.service';
import { NotificationService } from 'src/app/services/notify/notification.service';

@Component({
  selector: 'app-claim-employe',
  templateUrl: './claim-employe.component.html',
  styleUrls: ['./claim-employe.component.css']
})
export class ClaimEmployeComponent implements OnInit {

  @Input() claim_form:any;
  @Input() claimObj:any;
  payments:any;
  @Input() claimDetails:any;
  claimModelWindow:any;
  @Input() id: string ='';
  @ViewChild('claimEmployeModel') public claimEmployeModel!: ModalDirective;

  paymentsReview:any={}

  staticData:any={};
  claimTypes:any=[];
  activeIndex:number=-1;
  confirmationType:any='';

  empFields:any = []
  showDetails:boolean=true;
  others:boolean=false;
  empWithDetails:boolean=false;
  headerIntrestRate:boolean=false;
  claimDetaisFields:any = [];
  opclaimDetaisFields:any = [];
  payments_update_index:number=-1;
  claimStaticData:any;



  constructor(
    private modelService:ModelService,
    private addClaimService:AddClaimServiceService,
    private deleteRecordService:DeleteRecordService,
    private dataShareService:DataShareService,
    private commonFunctionService:CommonFunctionService,
    private notificationService:NotificationService,
    private storageService:StorageService
  ) {
    let types = this.getClaimTypes();
    if(types){
      this.claimTypes = types;
    }
    this.dataShareService.confirmationResponce.subscribe(check =>{
      if(this.activeIndex > -1){
        this.delete(check);
      }
    })

  }
  getClaimTypes(){
    let types = {};
    this.claimStaticData = this.storageService.GetStaticData();
    if(this.claimStaticData && this.claimStaticData.calimType){
      types = this.claimStaticData.calimType;
    }
    return types;
  }

  ngOnInit() {
    let modal = this;
    if (!this.id) {
        console.error('modal must have an id');
        return;
    }
    this.modelService.remove(this.id);
    this.modelService.add(this);
  }
  showModal(alert:any){
    if(!this.claimTypes ||(typeof this.claimTypes=='object' && Object.keys(this.claimTypes).length==0)) this.claimTypes = this.getClaimTypes();
    if(alert && alert.claimModelWindow){
      this.claimModelWindow = alert.claimModelWindow;
      this.payments = alert.payments;
      this.claimObj = alert.claimObj;
      switch (alert.claimModelWindow) {
        case 'CLAIM_MODEL_EMPLOYEE':
          this.empFields = [
            {"label":"Employee/Workmen ID","name":"unit","type":"text"},
            {"label":"Name","name":"name","type":"text"},
            {"label":"Type","name":"type","type":"select","change":false,"ddn_field":"unit_select","dataType":"test"},
            {"label":"Comment","name":"comment","type":"text"}
          ]
          this.claimDetaisFields = [
            {"label":"Claim Due Date","name":"dueDate","type":"date"},
            {"label":"Claim Amount","name":"amount","type":"number","change":true},
            {"label":"Interest Amount","name":"interest","type":"number","change":true},
            {"label":"Penalty + Charges","name":"penalty","type":"number","change":true},
            {"label":"Total","name":"total","type":"text","disable":true}
          ]
          this.staticData['unit_select'] = this.claimTypes['EC']['EC'];
          break;
        case 'CLAIM_MODEL_OTHERS':
          this.empFields = [
            {"label":"Claim Type","name":"unit","type":"text"},
            {"label":"Claim Date","name":"date","type":"date"},
            {"label":"Comment","name":"comment","type":"text"}
          ]
          this.claimDetaisFields = [
            {"label":"Claim Due Date","name":"dueDate","type":"date"},
            {"label":"Claim Amount","name":"amount","type":"number","change":true},
            {"label":"Interest Amount","name":"interest","type":"number","change":true},
            {"label":"Penalty + Charges","name":"penalty","type":"number","change":true},
            {"label":"Total","name":"total","type":"text","disable":true}
          ]
          break;
        case 'CLAIM_MODEL_OPERATIONAL_CREDITOR':
          this.empFields = [
            {"label":"Type","name":"type","type":"select","change":false,"ddn_field":"unit_select","dataType":"key_value"},
            {"label":"Invoice Date","name":"date","type":"date"},
            {"label":"Invoice No","name":"unit","type":"text"}
          ]
          this.opclaimDetaisFields = [
            {"label":"Due Date","name":"dueDate","type":"date"},
            {"label":"Amount","name":"amount","type":"number","change":true},
            {"label":"Interest Amount","name":"interest","type":"number","change":true},
            {"label":"Penalty + Charges","name":"penalty","type":"number","change":true},
            {"label":"Total","name":"total","type":"text","disable":true}
          ];
          this.claimDetaisFields = [];
          this.others = true;
          this.showDetails=false;
          this.empWithDetails = true;
          this.staticData['unit_select'] = this.claimTypes[this.claim_form.category];
          break;
        case 'CLAIM_MODEL_BANK':
          this.empFields = [
            {"label":"Claim Type","name":"unit","type":"select","change":true,"ddn_field":"unit_select","call_back_field":"type_select","dataType":"key_value"},
            {"label":"Facility Type","name":"type","type":"select","change":false,"ddn_field":"type_select"},
            {"label":"Approval Date","name":"date","type":"date"},
            {"label":"Comment","name":"comment","type":"text"},
            {"label":"","name":"total","type":"label","data":'claim'}
          ]
          this.others = true;
          this.claimDetaisFields = [
            {"label":"Payment Date","name":"paymentDate","type":"date"},
            {"label":"Payment Mode","name":"mode","type":"text"},
            {"label":"Payment Reference","name":"reference","type":"text"},
            {"label":"Payment Amount","name":"amount","type":"number","change":true},
            {"label":"Interest Amount","name":"interest","type":"number","change":true},
            {"label":"Penalty + Charges","name":"penalty","type":"number","change":true},
            {"label":"Total","name":"total","type":"text","disable":true}
          ]
          this.staticData['unit_select'] = this.claimTypes[this.claim_form.category];
          break;
        case 'CLAIM_MODEL_HOME_BUYER':
          this.empFields = [
            {"label":"Unit No","name":"unit","type":"text"},
            {"label":"Area(in Sq. Feet)","name":"area","type":"text"},
            {"label":"Unit Type/Tower No","name":"type","type":"text","change":false},
            {"label":"Total","name":"total","type":"label","data":'claim'}
          ]
          this.claimDetaisFields = [
            {"label":"Date","name":"paymentDate","type":"date"},
            {"label":"Payment Mode","name":"mode","type":"select","change":false,"ddn_field":"unit_select","dataType":"text"},
            {"label":"Reference","name":"reference","type":"text"},
            {"label":"Payment Amount","name":"amount","type":"number","change":true},
            {"label":"Tax(*for claim purpose Tax is excluded)","name":"tax","type":"number","change":false},
            {"label":"Interest","name":"interest","type":"number","change":true,"disableCheck":true},
            {"label":"Total","name":"total","type":"number","data":'claim'}
          ]
          this.headerIntrestRate = true;
          this.staticData['unit_select'] =["Cash","Credit Card","Debit Card","Cheque","UPI","Net Banking","CRN GST Input Credit","TDS","CRN TDS","CRN Transfer of Unit Within Project","CRN Transfer of Unit from Other Project","CRN Change in Payment Plan"]
          break
        case 'CLAIM_MODEL_HOME_BUYER_FOR_REVIEW':
          this.empFields = [
            {"label":"Unit No","name":"unit","type":"text"},
            {"label":"Area(in Sq. Feet)","name":"area","type":"text"},
            {"label":"Unit Type/Tower No","name":"type","type":"number","change":false},
            {"label":"Total","name":"total","type":"label","data":'claim'}
          ]
          this.claimDetaisFields = [
            {"label":"Date","name":"paymentDate","type":"date","disable":true},
            {"label":"Payment Mode","name":"mode","type":"text","disable":true},
            {"label":"Reference","name":"reference","type":"text","disable":true},
            {"label":"Principle Amount","name":"amount","type":"number","change":true,"disable":true},
            {"label":"Interest","name":"interest","type":"number","change":true,"disableCheck":true},
            {"label":"Total","name":"total","type":"label","data":'claim'},
            {"label":"Tax","name":"tax","type":"text","disable":true},
            {"label":"Claim Amount With 8%","name":"total_amount","type":"label","data":'claim'},
            {"label":"Approved Amount","name":"approvedAmount","type":"number","change":false},
            {"label":"Comments","name":"comment","type":"text"}
          ]
          this.headerIntrestRate = true;
          break;
        default:
          break;
      }
    }
    if(this.claim_form && this.claim_form.claimAmountDetails){
      this.claimDetails = this.claim_form.claimAmountDetails;
    }
    this.claimEmployeModel.show();
  }
  selectChange(emp:any){
    if(emp && emp.change){
      let fieldName = this.claimObj.unitDetails[emp.name];
      let key = emp.call_back_field;
      let list = this.claimTypes[this.claim_form.category][fieldName];
      this.staticData[key] = list;
    }
  }
  close(){
    this.claimDetails = [];
    this.claimObj={};
    this.claimObj.unitDetails={}
    this.claimObj.paymentDetails=[{}];
    this.claimEmployeModel.hide();
  }
  addClaimObj(){
    if(!this.claimObj || !this.claimObj.unitDetails || !this.claimObj.unitDetails.unit){
      this.notificationService.notify('bg-danger',"Please fill in all the details.. ");
      return
    }
    if(this.claim_form.formName!=='B'){
        this.claimObj.paymentDetails=[];
    }else{
        if(!this.claimObj.paymentDetails || !this.claimObj.paymentDetails[0] || this.claimObj.paymentDetails[0].total<=0){
          this.notificationService.notify('bg-danger',"Please fill Amount..");
          return;
        }
    }
    //this.claimObj.paymentDetails[0].otherType=this.claimObj.unitDetails.otherType;
    this.claimDetails.push(this.commonFunctionService.cloneObject(this.claimObj));
    this.claim_form.claimAmountDetails = this.claimDetails;
    for(var i=0;i<this.claimDetails.length;i++){
      if(this.payments.length != this.claimDetails.length){
        this.payments.push({});
      }
    }
    if(this.claim_form.formName==='B'){
        this.calculateTotalClaimAmount();
    }else{
      this.commonFunctionService.saveClaimForm(this.claim_form);
    }
    this.claimObj={};
    this.claimObj.unitDetails={}
    this.claimObj.paymentDetails=[{}];
  }
  activeClaim:any={};
  deleteRecord(object:any,index:number,key:any){
    this.confirmationType = key;
    this.activeIndex = index;
    this.activeClaim= object;
    this.deleteRecordService.deleteRecord(object,this.claim_form);
  }
  delete(check:boolean){
    if(check){
      switch (this.confirmationType) {
        case 'unit_details':
          this.claimDetails.splice(this.activeIndex,1);
          this.claimObj={};
          break;
        case 'payment_details':
          this.activeClaim.paymentDetails.splice(this.activeIndex,1);
          if(this.activeClaim.paymentDetails==undefined || this.activeClaim.paymentDetails.length==0){
            this.activeClaim.paymentDetails=[];
          }
          break;
        default:
          break;
      }

      this.calculateTotalClaimAmount();
    }
    this.activeIndex = -1;
  }
  calculateInterest(object:any){
    this.commonFunctionService.calculateInterest(object,this.claim_form);
  }
  calculateTotalClaimAmount(){
    this.commonFunctionService.calculateTotalClaimAmount(this.claimDetails,this.claim_form);
  }
  addPaymentDetails(object:any,index:number){
    this.addClaimService.addPaymentDetails(object,this.claimModelWindow,this.payments,index,this.claim_form,this.claimDetails);
  }
  addPaymentDetailsReview(object:any,index:number){
    this.addClaimService.addPaymentDetailsReview(object,this.claimModelWindow,this.paymentsReview,index,this.claim_form,this.claimDetails,this.payments_update_index)
  }
  updatePaymentRow(object:any,index:number){
    this.payments_update_index = index;
    var dateOut = new Date(object.paymentDate);
    object.paymentDate = dateOut
    this.paymentsReview = this.commonFunctionService.cloneObject(object);
  }
  cancilUpdatePayment(){
    this.payments_update_index = -1;
    this.paymentsReview = {};
  }
  closeClaimModel(){
    this.close();
    this.claimObj={};
    this.claimObj.unitDetails={}
    this.claimObj.paymentDetails=[{}];
  }

}
