import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-claim-amount-with-employee',
  templateUrl: './claim-amount-with-employee.component.html',
  styleUrls: ['./claim-amount-with-employee.component.css']
})
export class ClaimAmountWithEmployeeComponent implements OnInit {
  @Input() claim_form:any;
  constructor() { }

  ngOnInit() {
  }

}
