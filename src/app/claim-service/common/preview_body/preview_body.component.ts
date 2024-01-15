import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview_body',
  templateUrl: './preview_body.component.html',
  styleUrls: ['./preview_body.component.css']
})
export class Preview_bodyComponent implements OnInit {

  @Input() claim_form:any;
  @Input() downloadFile!: (doc:any) => void;
  @Input() deleteDocument!: (doc:any,index:number) => void;
  constructor() { }

  ngOnInit() {
  }

}
