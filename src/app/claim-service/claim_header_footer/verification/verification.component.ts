import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  @Input() claim_form:any;

  @Input() goPreviousPge!:()=>void;
  @Input() previewFormWindow!:(obj:any)=>void;
  @Input() showMyClaimForms!:()=>void;

  constructor() { }

  ngOnInit() {
  }

  // showMyClaimForms(){

  // }
  // goPreviousPge(){

  // }
  // previewFormWindow(data:any){

  // }

}
