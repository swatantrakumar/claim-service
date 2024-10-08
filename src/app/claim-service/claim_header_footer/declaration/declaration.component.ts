import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.css']
})
export class DeclarationComponent implements OnInit {
  @Input() claim_form:any;

  @Input() downloadFile!:(doc:any)=>void;
  @Input() goNextPage!:()=>void;
  @Input() goPreviousPge!:()=>void;
  @Input() showMyClaimForms!:()=>void;

  date=new Date();
  constructor() { }

  ngOnInit() {
  }


  changeinrelatedParty(check:boolean){
    if(check){
      this.claim_form.cocEligible=false;
      this.claim_form.notRelatedParty=false;
      this.claim_form.relatedParty=true;
    }else{
      this.claim_form.notRelatedParty=true;
      this.claim_form.relatedParty=false;
    }
  }
  // showMyClaimForms(){

  // }
  // goPreviousPge(){

  // }
  // goNextPage(){

  // }
}
