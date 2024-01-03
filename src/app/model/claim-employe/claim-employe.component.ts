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
  @Input() payments:any;
  @Input() claimDetails:any;
  @Input() claimModelWindow:any;
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
  claimDetaisFields:any = []
  payments_update_index:number=-1;



  constructor(
    private modelService:ModelService,
    private addClaimService:AddClaimServiceService,
    private deleteRecordService:DeleteRecordService,
    private dataShareService:DataShareService,
    private commonFunctionService:CommonFunctionService
  ) {
    let claimDetails = this.dataShareService.getClaimStaticData();
    if(claimDetails && claimDetails.calimType){
      let types = claimDetails.calimType;
      if(types && types.EC && types.EC.EC){
        this.claimTypes = types.EC.EC;
      }
    }
    this.dataShareService.confirmationResponce.subscribe(check =>{
      if(this.activeIndex > -1){
        this.delete(check);
      }
    })

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

    this.claimEmployeModel.show();
    if(this.claimModelWindow){
      switch (this.claimModelWindow) {
        case 'CLAIM_MODEL_EMPLOYEE':
          this.empFields = [
            {"label":"Employee/Workmen ID","name":"unit","type":"text"},
            {"label":"Name","name":"name","type":"text"},
            {"label":"Type","name":"type","type":"select","ddn":""},
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
            {"label":"Type","name":"unit","type":"text"},
            {"label":"Invoice Date","name":"name","type":"text"},
            {"label":"Invoice No","name":"type","type":"select","ddn":""}
          ]
          this.claimDetaisFields = [
            {"label":"Due Date","name":"dueDate","type":"date"},
            {"label":"Amount","name":"amount","type":"number","change":true},
            {"label":"Interest Amount","name":"interest","type":"number","change":true},
            {"label":"Penalty + Charges","name":"penalty","type":"number","change":true},
            {"label":"Total","name":"total","type":"text","disable":true}
          ]
          this.others = true;
          this.showDetails=false;
          this.empWithDetails = true;
          break;
        case 'CLAIM_MODEL_BANK':
          this.empFields = [
            {"label":"Claim Type","name":"unit","type":"select","change":true},
            {"label":"Facility Type","name":"type","type":"select","change":false},
            {"label":"Approval Date","name":"date","type":"date","ddn":""},
            {"label":"Comment","name":"comment","type":"text"},
            {"label":"","name":"total","type":"label","data":'claim'}
          ]
          this.others = true;
          this.claimDetaisFields = [
            {"label":"Payment Date","name":"date","type":"date"},
            {"label":"Payment Mode","name":"mode","type":"text"},
            {"label":"Payment Reference","name":"reference","type":"text"},
            {"label":"Payment Amount","name":"amount","type":"number","change":true},
            {"label":"Interest Amount","name":"interest","type":"number","change":true},
            {"label":"Penalty + Charges","name":"penalty","type":"number","change":true},
            {"label":"Total","name":"total","type":"text","disable":true}
          ]
          break;
        case 'CLAIM_MODEL_HOME_BUYER':
          this.empFields = [
            {"label":"Unit No","name":"unit","type":"text"},
            {"label":"Area(in Sq. Feet)","name":"area","type":"text"},
            {"label":"Unit Type/Tower No","name":"type","type":"number","change":false},
            {"label":"","name":"total","type":"label","data":'claim'}
          ]
          this.claimDetaisFields = [
            {"label":"Date","name":"paymentDate","type":"date"},
            {"label":"Payment Mode","name":"mode","type":"select"},
            {"label":"Reference","name":"reference","type":"text"},
            {"label":"Payment Amount","name":"amount","type":"number","change":true},
            {"label":"Tax(*for claim purpose Tax is excluded)","name":"tax","type":"number","change":false},
            {"label":"Interest","name":"interest","type":"number","change":true},
            {"label":"","name":"total","type":"label","data":'claim'}
          ]
          this.headerIntrestRate = true;
          break
        case 'CLAIM_MODEL_HOME_BUYER_FOR_REVIEW':
          this.empFields = [
            {"label":"Unit No","name":"unit","type":"text"},
            {"label":"Area(in Sq. Feet)","name":"area","type":"text"},
            {"label":"Unit Type/Tower No","name":"type","type":"number","change":false},
            {"label":"","name":"total","type":"label","data":'claim'}
          ]
          this.claimDetaisFields = [
            {"label":"Date","name":"paymentDate","type":"date","disable":true},
            {"label":"Payment Mode","name":"mode","type":"select","disable":true},
            {"label":"Reference","name":"reference","type":"text","disable":true},
            {"label":"Principle Amount","name":"amount","type":"number","change":true,"disable":true},
            {"label":"Interest","name":"interest","type":"number","change":true},
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
  }
  close(){
    this.claimEmployeModel.hide();
  }
  addClaimObj(){
    this.addClaimService.addClaimObj(this.claimObj,this.claim_form,this.claimDetails);
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

      //this.calculateTotalClaimAmount();
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
  }

}
