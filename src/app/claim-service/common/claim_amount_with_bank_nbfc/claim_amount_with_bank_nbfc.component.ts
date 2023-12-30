import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-claim_amount_with_bank_nbfc',
  templateUrl: './claim_amount_with_bank_nbfc.component.html',
  styleUrls: ['./claim_amount_with_bank_nbfc.component.css']
})
export class Claim_amount_with_bank_nbfcComponent implements OnInit {

  @Input() claim_form:any;

  constructor() { }

  ngOnInit() {
  }

}
