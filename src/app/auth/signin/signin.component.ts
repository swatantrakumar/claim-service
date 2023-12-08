import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AwsCognitoService } from 'src/app/services/aws-cognito/aws-cognito.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private awsCognitoService:AwsCognitoService
  ) { }

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
    let payload ={
      email:value.userId,
      password:value.password
    }
    this.awsCognitoService.sigin(payload);
    console.log(value);
    this.loginForm.reset();
  }

}
