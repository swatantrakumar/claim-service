import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-claim_amount_with_unit_details',
  templateUrl: './claim_amount_with_unit_details.component.html',
  styleUrls: ['./claim_amount_with_unit_details.component.css']
})
export class Claim_amount_with_unit_detailsComponent implements OnInit {

  @Input() claim_form:any;

  constructor() { }

  ngOnInit() {
  }

}
