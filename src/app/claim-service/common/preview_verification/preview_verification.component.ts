import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview_verification',
  templateUrl: './preview_verification.component.html',
  styleUrls: ['./preview_verification.component.css']
})
export class Preview_verificationComponent implements OnInit {

  @Input() claim_form:any;

  constructor() { }

  ngOnInit() {
  }

}
