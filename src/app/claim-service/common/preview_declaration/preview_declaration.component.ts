import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview_declaration',
  templateUrl: './preview_declaration.component.html',
  styleUrls: ['./preview_declaration.component.css']
})
export class Preview_declarationComponent implements OnInit {

  @Input() claim_form:any;
  @Input() downloadFile!: (doc:any) => void;
  date = new Date();
  constructor() { }

  ngOnInit() {
  }

}
