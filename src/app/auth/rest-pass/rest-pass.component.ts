import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'lib-rest-pass',
  templateUrl: './rest-pass.component.html',
  styleUrls: ['./rest-pass.component.css']
})
export class RestPassComponent implements OnInit {
  resetForm!:FormGroup

  constructor() { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.resetForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$')])
    }
    );
  }
  reset(){
    let value = this.resetForm.getRawValue();
    console.log(value);
    this.resetForm.reset();
  }
}
