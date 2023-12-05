import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'lib-new-pass',
  templateUrl: './new-pass.component.html',
  styleUrls: ['./new-pass.component.css']
})
export class NewPassComponent implements OnInit {
  resetNewPass!:FormGroup;

  constructor() { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.resetNewPass = new FormGroup({
      'verificationCode': new FormControl('', [Validators.required]),
      'newPassword': new FormControl('', [Validators.required]),
      'confirmPassword': new FormControl('', [Validators.required])
    }
    );
  }
  saveNewPassword(){
    let value = this.resetNewPass.getRawValue();
    console.log(value);
    this.resetNewPass.reset();
  }

}
