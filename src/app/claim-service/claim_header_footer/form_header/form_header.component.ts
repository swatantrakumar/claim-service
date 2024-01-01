import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form_header',
  templateUrl: './form_header.component.html',
  styleUrls: ['./form_header.component.css']
})
export class Form_headerComponent implements OnInit {

  @Input() claim_form:any;
  @Input() selectedForm:any='';
  constructor() { }

  ngOnInit() {
  }

}
