import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form_c',
  templateUrl: './form_c.component.html',
  styleUrls: ['./form_c.component.css']
})
export class Form_cComponent implements OnInit {
  @Input() claim_form:any;
  @Input() showIdDetails: boolean = false;
  @Input() showCinDetails: boolean = false;
  @Input() claimModeByClass: boolean = false;
  @Input() claimModeByBank: boolean = false;
  @Input() showDeclaration: boolean = false;
  @Input() showVerification: boolean = false;
  @Input() selectedForm:string='';

  constructor() { }

  ngOnInit() {
  }

}
