import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-irp-information',
  templateUrl: './irp-information.component.html',
  styleUrls: ['./irp-information.component.css']
})
export class IrpInformationComponent implements OnInit {
  @Input() claim_form:any;

  constructor() { }

  ngOnInit() {
  }

}
