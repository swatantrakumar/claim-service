import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AwsCognitoService } from 'src/app/services/aws-cognito/aws-cognito.service';
import { CustomvalidationService } from 'src/app/services/customvalidation/customvalidation.service';
import { ModelService } from 'src/app/services/model/model.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm!: FormGroup;

  constructor(
    private awsCognitoService:AwsCognitoService,
    private customValidationService:CustomvalidationService,
    private modelService:ModelService
  ) { }

  ngOnInit() {
    this.initForm();
  }
  onSignUp() {
    this.modelService.open("WAIT_MODEL",{});
    const payload = this.signUpForm.getRawValue();
    this.awsCognitoService.signup(payload);
    this.signUpForm.reset();
  }

  initForm() {
    this.signUpForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$')]),
      'mobile': new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      'password': new FormControl('', [Validators.required]),
      'name': new FormControl('', Validators.required),
    }
    );
  }

}
