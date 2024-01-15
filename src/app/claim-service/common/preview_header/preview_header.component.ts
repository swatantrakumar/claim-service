import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview_header',
  templateUrl: './preview_header.component.html',
  styleUrls: ['./preview_header.component.css']
})
export class Preview_headerComponent implements OnInit {

  @Input() claim_form:any;

  constructor() { }

  ngOnInit() {
  }

}
