import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loginForm!: FormGroup;

  constructor() { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      'userId': new FormControl('', [Validators.required,Validators.email]),
      'password': new FormControl('', [Validators.required])
    });
  }
  onSignIn() {
    const value = this.loginForm.getRawValue();
    console.log(value);
    this.loginForm.reset();
  }

}
