import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-address-information',
  templateUrl: './address-information.component.html',
  styleUrls: ['./address-information.component.css']
})
export class AddressInformationComponent implements OnInit {
  @Input() claim_form:any;

  constructor() { }

  ngOnInit() {
  }

}
