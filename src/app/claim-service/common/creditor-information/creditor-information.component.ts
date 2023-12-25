import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-creditor-information',
  templateUrl: './creditor-information.component.html',
  styleUrls: ['./creditor-information.component.css']
})
export class CreditorInformationComponent implements OnInit {

  @Input() claim_form:any;

  constructor() { }

  ngOnInit() {
  }

}
