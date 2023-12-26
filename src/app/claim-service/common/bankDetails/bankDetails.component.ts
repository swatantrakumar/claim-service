import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bankDetails',
  templateUrl: './bankDetails.component.html',
  styleUrls: ['./bankDetails.component.css']
})
export class BankDetailsComponent implements OnInit {
  @Input() claim_form:any;

  constructor() { }

  ngOnInit() {
  }

}
