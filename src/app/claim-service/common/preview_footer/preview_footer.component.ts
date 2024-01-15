import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview_footer',
  templateUrl: './preview_footer.component.html',
  styleUrls: ['./preview_footer.component.css']
})
export class Preview_footerComponent implements OnInit {

  @Input() claim_form:any;
  constructor() { }

  ngOnInit() {
  }

}
