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
  constructor(
    private commonFunctionService:CommonFunctionService,
    private dataShareServie:DataShareService
  ) { }

  ngOnInit() {
  }
  saveClaimForm(){
    this.commonFunctionService.saveClaimForm(this.claim_form);
  }
  showMyClaimForms(){
    this.dataShareServie.claimFormExist(true);
  }
  goNextPage(){
    this.dataShareServie.claimNextForm(true);
  }

}
