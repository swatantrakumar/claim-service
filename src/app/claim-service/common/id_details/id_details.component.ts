import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-id_details',
  templateUrl: './id_details.component.html',
  styleUrls: ['./id_details.component.css']
})
export class Id_detailsComponent implements OnInit {
  @Input() CIN:any;
  @Input() claim_form:any;

  constructor() { }

  ngOnInit() {
  }

}
