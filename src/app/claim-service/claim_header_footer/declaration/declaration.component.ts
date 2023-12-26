import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.css']
})
export class DeclarationComponent implements OnInit {
  @Input() claim_form:any;

  date=new Date();
  constructor() { }

  ngOnInit() {
  }

  downloadFile(doc:any){

  }
  changeinrelatedParty(check:boolean){

  }
  showMyClaimForms(){

  }
  goPreviousPge(){

  }
  goNextPage(){

  }
}
