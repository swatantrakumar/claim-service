import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form_c',
  templateUrl: './form_c.component.html',
  styleUrls: ['./form_c.component.css']
})
export class Form_cComponent implements OnInit {
  @Input() claim_form:any;
  @Input() claimObj:any;
  @Input() showIdDetails: boolean = false;
  @Input() showCinDetails: boolean = false;
  @Input() claimModeByClass: boolean = false;
  @Input() claimModeByBank: boolean = false;
  @Input() showDeclaration: boolean = false;
  @Input() showVerification: boolean = false;
  @Input() selectedForm:string='';
  @Input() activeTabName:string='';
  @Input() creditDetails:boolean=false;
  @Input() showForm:boolean=false;

  @Input() downloadFile!:(doc:any)=>void;
  @Input() deleteDocument!:(doc:any,index:number,key?:any) => void;
  @Input() goNextPage!:()=>void;
  @Input() goPreviousPge!:()=>void;
  @Input() showMyClaimForms!:()=>void;
  @Input() previewFormWindow!:(obj:any)=>void;
  @Input() idVerificationWindow!: () => void;
  @Input() claimModelPopUp!: () => void;


  constructor() { }

  ngOnInit() {
  }

}
