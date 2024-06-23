import { Component, Input, OnInit } from '@angular/core';
import { CommonFunctionService } from 'src/app/services/common-function/common-function.service';
import { DataShareService } from 'src/app/services/data-share-service/data-share.service';

@Component({
  selector: 'app-form_footer',
  templateUrl: './form_footer.component.html',
  styleUrls: ['./form_footer.component.css']
})
export class Form_footerComponent implements OnInit {

  @Input() claim_form:any;

  @Input() goNextPage!:()=>void;
  @Input() showMyClaimForms!:()=>void;
  @Input() uploadFile!:(type:any,key?:any) => void;
  @Input() setFiles!:(event:any, fileType:string,keyNames?:string) => void;

  constructor(
    private commonFunctionService:CommonFunctionService,
    private dataShareServie:DataShareService
  ) { }

  ngOnInit() {
  }
  saveClaimForm(){
    this.commonFunctionService.saveClaimForm(this.claim_form);
  }
  // showMyClaimForms(){
  //   this.dataShareServie.claimFormExist(true);
  // }
  // goNextPage(){
  //   this.dataShareServie.claimNextForm(true);
  // }

  disableSave(): boolean {
    if (this.claim_form.catClass !== "Home Buyers" || this.claim_form.category !== "FC") {
      return false;
    }
    if (this.claim_form?.formAttachments === null || !this.claim_form?.formAttachments?.docList) {
      return true;
    }
    
    let hasCC = false;
    let hasPAP = false;
    for (let doc of this.claim_form?.formAttachments?.docList) {
      if (doc["keyName"] === "CC") hasCC = true;
      if (doc["keyName"] === "PAP") hasPAP = true;

      if (hasCC && hasPAP) return false;
    }
    return true;
  }

}
