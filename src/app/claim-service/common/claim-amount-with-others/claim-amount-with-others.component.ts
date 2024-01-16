import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-claim-amount-with-others',
  templateUrl: './claim-amount-with-others.component.html',
  styleUrls: ['./claim-amount-with-others.component.css']
})
export class ClaimAmountWithOthersComponent implements OnInit {
  @Input() claim_form:any;
  constructor() { }

  ngOnInit() {
  }

}
