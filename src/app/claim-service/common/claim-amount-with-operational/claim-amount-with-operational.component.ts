import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-claim-amount-with-operational',
  templateUrl: './claim-amount-with-operational.component.html',
  styleUrls: ['./claim-amount-with-operational.component.css']
})
export class ClaimAmountWithOperationalComponent implements OnInit {
  @Input() claim_form:any;
  constructor() { }

  ngOnInit() {
  }

}
