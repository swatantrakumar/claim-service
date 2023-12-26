import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form_c',
  templateUrl: './form_c.component.html',
  styleUrls: ['./form_c.component.css']
})
export class Form_cComponent implements OnInit {
  @Input() claim_form:any;
  @Input()
  showIdDetails!: boolean;
  @Input() showCinDetails:any;
  @Input() claimModeByClass:any;
  @Input() claimModeByBank:any;
  @Input() showDeclaration:any;
  @Input() showVerification:any;

  constructor() { }

  ngOnInit() {
  }

}
