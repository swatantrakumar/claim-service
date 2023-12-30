import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-securityDetails',
  templateUrl: './securityDetails.component.html',
  styleUrls: ['./securityDetails.component.css']
})
export class SecurityDetailsComponent implements OnInit {
  @Input() claim_form:any;

  constructor() { }

  ngOnInit() {
  }

}
